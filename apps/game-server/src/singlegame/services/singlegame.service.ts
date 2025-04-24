import * as probe from 'probe-image-size';
import { HttpException, Injectable } from '@nestjs/common';
import { GameLevel } from '@puzzlepop2/game-core';
import { Engine } from '@puzzlepop2/game-engine-server';

@Injectable()
export class SinglegameService {
  constructor() {}

  async initializePieces(props: { src: string; level: GameLevel }) {
    const { src, level } = props;

    try {
      const { width, height } = await probe(src);
      return Engine.createPieces({
        gameLevel: level,
        imgWidth: width,
        imgHeight: height,
        options: {
          position: 'random',
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException('Invalid image', 400);
    }
  }
}
