import { MulterModule as _MulterModule } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

const createFolder = (folder: string, uniqueFileName: string) => {
  try {
    console.log('💾 Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  } catch (error) {
    console.log('The folder already exists...');
  }
  try {
    console.log(`💾 Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
  try {
    console.log(`💾 Create a ${folder}/${uniqueFileName} uploads folder...`);
    fs.mkdirSync(
      path.join(__dirname, '..', `uploads/${folder}/${uniqueFileName}`),
    );
  } catch (error) {
    console.log(`The ${folder}/${uniqueFileName} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  const uniqueFileName = `${uuid()}${Date.now()}`;
  return multer.diskStorage({
    destination(req, file, cb) {
      const folderName = path.join(
        __dirname,
        '..',
        `uploads/${folder}/${uniqueFileName}`,
      );
      createFolder(folder, uniqueFileName);
      cb(null, folderName);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const fileName = `uploaded${ext}`;
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
