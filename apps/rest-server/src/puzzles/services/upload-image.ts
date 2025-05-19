import { PUZZLE_IMAGE_SIZE_MAP } from '@puzzlepop2/game-core';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { HttpException } from '@nestjs/common';
import { requestWithFormData } from 'src/remotes/request';
import { PostNSFWResponse } from 'src/remotes/types';
import { getAiServerUrl } from 'src/remotes/end-point';

const CDN_SIZES = {
  sm: 0.25,
  md: 0.5,
  lg: 0.75,
};

export const validateNSFW = async (file: Express.Multer.File) => {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(file.path), {
    filename: file.originalname,
    contentType: file.mimetype,
  });

  const { data } = await requestWithFormData.post<PostNSFWResponse>(
    `${getAiServerUrl()}/nsfw-check`,
    formData,
    {
      headers: formData.getHeaders(),
    },
  );
  return data;
};

export const createNewFile = async (file: Express.Multer.File) => {
  const LIMIT_SIZE = 1000;

  const image = sharp(file.path);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  if (!width || !height) {
    throw new HttpException('유효한 이미지가 아니에요', 500);
  }

  try {
    let newFile = image.toFormat('webp');
    if (width < LIMIT_SIZE && height < LIMIT_SIZE) {
      console.log('이미지가 작아서 키웁니다');
      // 짧은 쪽이 1000이 되게 비율 계산
      const scale = LIMIT_SIZE / Math.min(width, height);
      const newWidth = Math.round(width * scale);
      const newHeight = Math.round(height * scale);
      newFile = newFile.resize(newWidth, newHeight);

      // TODO: 업스케일링
    }
    await newFile.toFile(`${file.destination}/origin.webp`);
  } catch (error) {
    console.error('이미지 변환 오류');
    throw new HttpException('이미지를 변환하는데 오류가 발생했어요', 500);
  }
};

export const createCDNImage = async (file: Express.Multer.File) => {
  const origin = `${file.destination}/origin.webp`;
  const originImage = sharp(origin);
  const metadata = await originImage.metadata();
  const width = metadata.width;
  const height = metadata.height;

  if (!width || !height) {
    throw new HttpException('유효한 이미지가 아니에요', 400);
  }

  const makeToGameMode = () => {
    return Object.entries(PUZZLE_IMAGE_SIZE_MAP).map(([gameMode, size]) => {
      const { width, height } = size;
      sharp(origin)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .resize(width, height, { fit: 'cover', position: 'center' })
        .toFormat('webp')
        .toFile(`${file.destination}/${gameMode}.webp`);
    });
  };

  const makeToCDN = () => {
    return Object.entries(CDN_SIZES).map(([size, ratio]) => {
      sharp(origin)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .resize(Math.floor(width * ratio), Math.floor(height * ratio), {
          fit: 'cover',
          position: 'center',
        })
        .toFormat('webp')
        .toFile(`${file.destination}/${size}.webp`);
    });
  };

  // 리사이징하면서 webp로 변환
  Promise.all([...makeToGameMode(), ...makeToCDN()]).catch(() => {
    throw new HttpException('이미지를 변환하는데 오류가 발생했어요', 500);
  });
};
