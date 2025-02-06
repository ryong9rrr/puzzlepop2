#node:20-alpine 이미지를 사용하여 가벼운 Alpine Linux 기반의 Node.js 환경을 설정.
#이후 단계에서 이 이미지를 공통 베이스로 사용하기 위해 base라는 이름을 붙임.
FROM node:20-alpine AS base

# base를 기반으로 하는 새로운 빌드 스테이지(builder)를 생성.
# apk update → Alpine 패키지 관리자를 업데이트.
# apk add --no-cache libc6-compat → glibc와의 호환성을 위해 추가 라이브러리를 설치.
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

# WORKDIR /app → 작업 디렉토리를 /app으로 설정.
# yarn global add turbo → Turborepo(모노레포 관리 도구) 전역 설치.
# COPY . . → 로컬 파일을 컨테이너의 /app에 복사.
# RUN turbo prune web --docker
# Turborepo를 사용하여 apps/web에 필요한 패키지만 남기고 정리.
# 이렇게 하면 불필요한 파일이 제거되어 Docker 이미지가 가벼워짐.
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune web --docker

# 다시 base를 기반으로 설치 전용 단계(installer)를 생성.
# apk update && apk add --no-cache libc6-compat → 동일한 라이브러리를 추가.
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# builder 단계에서 생성된 out/json/을 복사 (package.json, yarn.lock 등).
# yarn install 실행 → 불필요한 패키지를 제외한 의존성만 설치.
COPY --from=builder /app/out/json/ .
RUN yarn install

# builder에서 생성된 out/full/을 복사하여 프로젝트 전체 파일 포함.
COPY --from=builder /app/out/full/ .

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

# yarn turbo build 실행 → apps/web을 빌드.
RUN yarn turbo build

# base를 사용해 실행 전용 이미지(runner)를 만듦.
# WORKDIR /app → 실행 시 사용될 작업 디렉토리 설정.
FROM base AS runner
WORKDIR /app

# 보안 강화를 위해 루트 사용자가 아닌 일반 사용자 (nextjs)를 생성하고 실행.
# 컨테이너를 보안적으로 강화하는 중요한 설정.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# .next/standalone → Next.js의 서버 실행 코드.
# .next/static → 정적 파일.
# public → 공개 리소스 (이미지, 폰트 등).
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD node apps/web/server.js
