import { SingleGamePuzzle } from '@puzzlepop2/game-core';

export class PuzzlesRepository {
  constructor() {}

  // TODO: pagination
  async findPuzzleList(): Promise<SingleGamePuzzle[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(singleGamePuzzleList);
      }, 100);
    });
  }

  async findPuzzleById(id: string): Promise<SingleGamePuzzle | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const puzzle =
          singleGamePuzzleList.find((puzzle) => puzzle.id === id) || null;
        resolve(puzzle);
      }, 100);
    });
  }
}

const singleGamePuzzleList: SingleGamePuzzle[] = [
  {
    id: '1',
    title:
      '핫도그를 든 짱구 핫도그를 든 짱구인데 제목이 길어지면 어떻게 되나 테스트 중... 핫도그를 든 짱구 핫도그를 든 짱구인데 제목이 길어지면 어떻게 되나 테스트 중...',
    description:
      '핫도그를 든 짱구 핫도그를 든 짱구인데 내용이 길어지면 어떻게 되나 테스트 중... 핫도그를 든 짱구 핫도그를 든 짱구인데 내용이 길어지면 어떻게 되나 테스트 중... 핫도그를 든 짱구 핫도그를 든 짱구인데 내용이 길어지면 어떻게 되나 테스트 중...',
    src: '/map-samples/map-sample1.jpg',
    uploader: '퍼즐팝',
    tags: ['짱구', '애니메이션'],
  },
  {
    id: '2',
    title: '파자마를 입은 짱구',
    description: '2번 내용',
    src: '/map-samples/map-sample2.jpg',
    uploader: '퍼즐팝',
    tags: ['짱구', '애니메이션'],
  },
  {
    id: '3',
    title: '치이카와와 친구들',
    description: '3번 내용',
    src: '/map-samples/map-sample3.jpeg',
    uploader: '퍼즐팝',
    tags: ['치이카와', '애니메이션'],
  },
  {
    id: '4',
    title: '귀멸의 칼날',
    description: '귀칼 조아',
    src: '/map-samples/map-sample4.jpg',
    uploader: '퍼즐팝',
    tags: ['귀멸의 칼날', '애니메이션'],
  },
  {
    id: '5',
    title: '센과 가오나시',
    description: '센과 치히로의 행방불명',
    src: '/map-samples/map-sample5.avif',
    uploader: '퍼즐팝',
    tags: ['센과 치히로의 행방불명', '애니메이션'],
  },
  {
    id: '6',
    title: '너의 이름은',
    description: '키미노 나마에와',
    src: '/map-samples/map-sample6.jpg',
    uploader: '퍼즐팝',
    tags: ['너의 이름은', '애니메이션'],
  },
  {
    id: '7',
    title: '더 퍼스트 슬램덩크',
    description: '그저 레전드...',
    src: '/map-samples/map-sample7.jpg',
    uploader: '퍼즐팝',
    tags: ['슬램덩크', '애니메이션'],
  },
  {
    id: '8',
    title: '잘못된 URL이 온다면?',
    description: '비동기 비동기...',
    src: '/sadfjkalsgjlkd',
    uploader: '퍼즐팝',
    tags: ['동기', '비동기'],
  },

  {
    id: '9',
    title:
      '핫도그를 든 짱구 핫도그를 든 짱구인데 제목이 길어지면 어떻게 되나 테스트 중... 핫도그를 든 짱구 핫도그를 든 짱구인데 제목이 길어지면 어떻게 되나 테스트 중...',
    description:
      '핫도그를 든 짱구 핫도그를 든 짱구인데 내용이 길어지면 어떻게 되나 테스트 중... 핫도그를 든 짱구 핫도그를 든 짱구인데 내용이 길어지면 어떻게 되나 테스트 중... 핫도그를 든 짱구 핫도그를 든 짱구인데 내용이 길어지면 어떻게 되나 테스트 중...',
    src: '/map-samples/map-sample1.jpg',
    uploader: '퍼즐팝',
    tags: ['짱구', '애니메이션'],
  },
  {
    id: '10',
    title: '파자마를 입은 짱구',
    description: '2번 내용',
    src: '/map-samples/map-sample2.jpg',
    uploader: '퍼즐팝',
    tags: ['짱구', '애니메이션'],
  },
  {
    id: '11',
    title: '치이카와와 친구들',
    description: '3번 내용',
    src: '/map-samples/map-sample3.jpeg',
    uploader: '퍼즐팝',
    tags: ['치이카와', '애니메이션'],
  },
  {
    id: '12',
    title: '귀멸의 칼날',
    description: '귀칼 조아',
    src: '/map-samples/map-sample4.jpg',
    uploader: '퍼즐팝',
    tags: ['귀멸의 칼날', '애니메이션'],
  },
  {
    id: '13',
    title: '센과 가오나시',
    description: '센과 치히로의 행방불명',
    src: '/map-samples/map-sample5.avif',
    uploader: '퍼즐팝',
    tags: ['센과 치히로의 행방불명', '애니메이션'],
  },
  {
    id: '14',
    title: '너의 이름은',
    description: '키미노 나마에와',
    src: '/map-samples/map-sample6.jpg',
    uploader: '퍼즐팝',
    tags: ['너의 이름은', '애니메이션'],
  },
  {
    id: '15',
    title: '더 퍼스트 슬램덩크',
    description: '그저 레전드...',
    src: '/map-samples/map-sample7.jpg',
    uploader: '퍼즐팝',
    tags: ['슬램덩크', '애니메이션'],
  },
  {
    id: '16',
    title: '잘못된 URL이 온다면?',
    description: '비동기 비동기...',
    src: '/sadfjkalsgjlkd',
    uploader: '퍼즐팝',
    tags: ['동기', '비동기'],
  },

  {
    id: '17',
    title:
      '핫도그를 든 짱구 핫도그를 든 짱구인데 제목이 길어지면 어떻게 되나 테스트 중... 핫도그를 든 짱구 핫도그를 든 짱구인데 제목이 길어지면 어떻게 되나 테스트 중...',
    description:
      '핫도그를 든 짱구 핫도그를 든 짱구인데 내용이 길어지면 어떻게 되나 테스트 중... 핫도그를 든 짱구 핫도그를 든 짱구인데 내용이 길어지면 어떻게 되나 테스트 중... 핫도그를 든 짱구 핫도그를 든 짱구인데 내용이 길어지면 어떻게 되나 테스트 중...',
    src: '/map-samples/map-sample1.jpg',
    uploader: '퍼즐팝',
    tags: ['짱구', '애니메이션'],
  },
  {
    id: '18',
    title: '파자마를 입은 짱구',
    description: '2번 내용',
    src: '/map-samples/map-sample2.jpg',
    uploader: '퍼즐팝',
    tags: ['짱구', '애니메이션'],
  },
  {
    id: '19',
    title: '치이카와와 친구들',
    description: '3번 내용',
    src: '/map-samples/map-sample3.jpeg',
    uploader: '퍼즐팝',
    tags: ['치이카와', '애니메이션'],
  },
  {
    id: '20',
    title: '귀멸의 칼날',
    description: '귀칼 조아',
    src: '/map-samples/map-sample4.jpg',
    uploader: '퍼즐팝',
    tags: ['귀멸의 칼날', '애니메이션'],
  },
];
