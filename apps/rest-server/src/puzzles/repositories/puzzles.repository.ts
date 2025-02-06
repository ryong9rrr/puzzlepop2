import { SingleGamePuzzle } from '@puzzlepop2/game';

export class PuzzlesRepository {
  constructor() {}

  // TODO: pagination
  async findPuzzleList() {
    const singleGamePuzzleList: SingleGamePuzzle[] = [
      {
        id: '1',
        title: '1번',
        description: '1번 내용',
        src: '/map-samples/map-sample1.jpg',
      },
      {
        id: '2',
        title: '2번',
        description: '2번 내용',
        src: '/map-samples/map-sample2.jpg',
      },
      {
        id: '3',
        title: '3번',
        description: '3번 내용',
        src: '/map-samples/map-sample3.jpeg',
      },
      {
        id: '4',
        title: '4번',
        description: '4번 내용',
        src: '/map-samples/map-sample4.jpg',
      },
      {
        id: '5',
        title: '5번',
        description: '5번 내용',
        src: '/map-samples/map-sample5.avif',
      },
      {
        id: '6',
        title: '6번',
        description: '6번 내용',
        src: '/map-samples/map-sample6.jpg',
      },
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(singleGamePuzzleList);
      });
    });
  }
}
