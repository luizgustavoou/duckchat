import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const multerConfig = {
  storage: diskStorage({
    destination: './uploads/users',
    filename: (req, file, cb) => {
      const fileName = uuidv4();

      const extension = path.extname(file.originalname);

      cb(null, `${fileName}${extension}`);
    },
  }),
};

export default multerConfig;
