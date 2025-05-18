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

const getDestination = (file: Express.Multer.File) => {
  return process.env.NODE_ENV === 'production'
    ? `/app/${file.destination}`
    : file.destination;
};

const getFileName = (file: Express.Multer.File) => {
  return file.filename.split('.').slice(0, -1).join('.');
};

const makeTempDir = (file: Express.Multer.File) => {
  fs.mkdirSync(`${getDestination(file)}/${getFileName(file)}`, {
    recursive: true,
  });
};

const removeTempDir = async (file: Express.Multer.File) => {
  try {
    console.log('임시 폴더 삭제 성공');
    await fs.promises.rm(`${getDestination(file)}/${getFileName(file)}`, {
      recursive: true,
      force: true,
    });
  } catch (error) {
    console.error(`임시 폴더 삭제 실패`, error);
  }
};

const getNewFileDir = (file: Express.Multer.File) => {
  return `${getDestination(file)}/${getFileName(file)}`;
};

const getNewFilePath = (file: Express.Multer.File) => {
  return `${getNewFileDir(file)}/origin.webp`;
};

export const removeTempFile = (path: string) => {
  try {
    fs.unlinkSync(path);
    console.log(`${path} 파일 삭제 성공`);
  } catch (error) {
    console.error(`파일 삭제 실패`, error);
  }
};

export const validateNSFW = async (file: Express.Multer.File) => {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(file.path), {
    filename: file.originalname,
    contentType: file.mimetype,
  });

  const response = await requestWithFormData.post<PostNSFWResponse>(
    `${getAiServerUrl()}/nsfw-check`,
    formData,
    {
      headers: formData.getHeaders(),
    },
  );

  if (response.status >= 500) {
    console.error('AI Server 호출 오류');
    throw new HttpException('AI Server 오류', 500);
  }

  const { data } = response;

  if (data.nsfw) {
    throw new HttpException(
      `${data.top_class} / 유해한 이미지는 업로드가 불가해요`,
      400,
    );
  }

  return data;
};

export const createNewFile = async (file: Express.Multer.File) => {
  const LIMIT_SIZE = 1000;

  const image = sharp(file.path);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;
  const newFilePath = getNewFilePath(file);

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

    // uploads 폴더 아래에 fileName 폴더를 만든다.
    makeTempDir(file);
    await newFile.toFile(newFilePath);

    // 업로드된 파일은 제거
    removeTempFile(file.path);
    return {
      newFilePath,
    };
    // eslint-disable-next-line
  } catch (error) {
    console.error('이미지 변환 오류');
    removeTempDir(file);
    throw new HttpException('이미지를 변환하는데 오류가 발생했어요', 500);
  }
};

export const createCDNImage = async (file: Express.Multer.File) => {
  const originImage = sharp(getNewFilePath(file));
  const metadata = await originImage.metadata();
  const width = metadata.width;
  const height = metadata.height;

  if (!width || !height) {
    throw new HttpException('유효한 이미지가 아니에요', 400);
  }

  const makeToGameMode = () => {
    return Object.entries(PUZZLE_IMAGE_SIZE_MAP).map(([gameMode, size]) => {
      const { width, height } = size;
      sharp(getNewFilePath(file))
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .resize(width, height, { fit: 'cover', position: 'center' })
        .toFormat('webp')
        .toFile(`${getNewFileDir(file)}/${gameMode}.webp`);
    });
  };

  const makeToCDN = () => {
    return Object.entries(CDN_SIZES).map(([size, ratio]) => {
      sharp(getNewFilePath(file))
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .resize(Math.floor(width * ratio), Math.floor(height * ratio), {
          fit: 'cover',
          position: 'center',
        })
        .toFormat('webp')
        .toFile(`${getNewFileDir(file)}/${size}.webp`);
    });
  };

  // 리사이징하면서 webp로 변환
  Promise.all([...makeToGameMode(), ...makeToCDN()]).catch(() => {
    throw new HttpException('이미지를 변환하는데 오류가 발생했어요', 500);
  });

  // Nginx로 복사

  // 삭제
  //await removeTempDir(file);
};
