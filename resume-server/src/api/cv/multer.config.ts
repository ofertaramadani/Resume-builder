import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads', // Specify the directory to save uploaded files
    filename: (req, file, callback) => {
      // Create a unique filename using the original file name and a timestamp
      const uniqueSuffix = Date.now() + extname(file.originalname);
      callback(null, file.fieldname + '-' + uniqueSuffix);
    },
  }),
  fileFilter: (req, file, callback) => {
    // Filter files by their MIME type (optional)
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
};
