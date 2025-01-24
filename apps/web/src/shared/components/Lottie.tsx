import { memo, useEffect, useMemo, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface LottieProps {
  src: object | string; // Lottie data
  loop?: boolean; // 반복 여부
  autoplay?: boolean; // 자동 재생 여부

  size?: number;
  zIndex?: number;
}

const Lottie = memo(
  (props: LottieProps) => {
    const { src: _src, loop = true, autoplay = true, size, zIndex = -10 } = props;

    const src = useMemo(() => _src, [_src]);
    const container = useRef<HTMLDivElement | null>(null);
    const player = useRef<AnimationItem | null>(null);

    useEffect(() => {
      if (!container.current) {
        return;
      }

      player.current = setLottiePlayer({
        container: container.current,
        loop,
        autoplay,
        src,
      });

      return () => {
        player.current?.destroy(); // 컴포넌트 언마운트 시 정리
      };
    }, [autoplay, loop, src]);

    return <div ref={container} style={{ zIndex, width: size, height: size }} />;
  },
  (prev, next) => {
    return prev.autoplay === next.autoplay && prev.loop === next.loop && prev.src === next.src;
  },
);

const setLottiePlayer = (props: {
  container: Element;
  loop: boolean;
  autoplay: boolean;
  src: object | string;
}) => {
  const { container, loop, autoplay, src } = props;

  if (typeof src === "string") {
    const [, assetsPath, name] = /(.+)\/(.+)\..+/.exec(src)!;

    return lottie.loadAnimation({
      container,
      loop,
      autoplay,
      renderer: "svg",
      path: src,
      assetsPath,
      name,
      rendererSettings: {
        progressiveLoad: true, // 점진적 로드 => 성능개선
        hideOnTransparent: true, // 투명배경 렌더링 X => 성능개선
      },
    });
  }

  return lottie.loadAnimation({
    container,
    loop,
    autoplay,
    renderer: "svg",
    animationData: src,
  });
};

Lottie.displayName = "Lottie";
export default Lottie;
