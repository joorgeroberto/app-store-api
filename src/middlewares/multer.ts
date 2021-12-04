import multer from "multer"
import path from "path"
import s3Storage from "multer-s3"
import aws from "aws-sdk"
import {randomBytes} from 'crypto'

const storageType = {
  s3: s3Storage({
    s3: new aws.S3(),
    bucket: 'eorganico-images',
    contentType: s3Storage.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (_, file, callback) => {
      randomBytes(16, (error, hash) => {
        if(error) {
          callback(error, file.originalname)
        }
        else {
          file.destination = `${hash.toString("hex")}-${file.originalname}`
          callback(null, file.destination)
        }
      })
    }
  }) 
}

export const optionsImage: multer.Options = {
  dest: path.resolve(__dirname),
  storage: storageType.s3,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, callback) => {
    const allow = ['image/jpg', 'image/png', 'image/jpeg']
    if(allow.includes(file.mimetype)) {
      callback(null, true)
    }
    else {
      callback(new Error("Image type is not allowed"))
    }
  }
};