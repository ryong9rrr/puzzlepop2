import { MulterModule as _MulterModule } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const createFolder = (folder: string) => {
  try {
    console.log('💾 Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
    // eslint-disable-next-line
  } catch (error) {
    console.log('The folder already exists...');
  }
  try {
    console.log(`💾 Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
    // eslint-disable-next-line
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    destination(req, file, cb) {
      //* 어디에 저장할 지
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      cb(null, folderName);
    },
    filename(req, file, cb) {
      // file 이름 정하기 : 아래는 원래 파일이름을 사용해야하는 경우
      const ext = path.extname(file.originalname);
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;

      // 원래 파일명은 필요없으므로 uuid 사용
      // const fileName = `${uuid()}${Date.now()}`;
      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
    fileFilter: (req, file, callback) => {
      // 파일 유형 필터링 (예: 이미지 파일만 허용)
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
        return callback(new Error('Invalid file type'), false);
      }
      callback(null, true);
    },
  };
  return result;
};

export const MulterModule = _MulterModule.register({ dest: './uploads' });
