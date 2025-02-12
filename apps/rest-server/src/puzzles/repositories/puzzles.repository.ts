import { SingleGamePuzzle } from '@puzzlepop2/game';

export class PuzzlesRepository {
  constructor() {}

  // TODO: pagination
  async findPuzzleList() {
    const singleGamePuzzleList: SingleGamePuzzle[] = [
      {
        id: '1',
        title:
          '핫도그를 든 짱구 핫도그를 든 짱구 핫도그를 든 짱구 핫도그를 든 짱구 핫도그를 든 짱구 핫도그를 든 짱구',
        description:
          '핫도그를 든 짱구 핫도그를 든 짱구 핫도그를 든 짱구 핫도그를 든 짱구 핫도그를 든 짱구 핫도그를 든 짱구',
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
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(singleGamePuzzleList);
      });
    });
  }
}
