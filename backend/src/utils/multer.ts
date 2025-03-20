import multer from "multer";
import path from "path";

const StorageUser = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "src/uploads/users");
  },
  filename(req, file, callback) {
    const namefile = Date.now() + Math.floor(Math.random() * 10000);
    const ext = path.extname(file.originalname);
    const finalExt = ext === ".jfif" ? ".webp" : ext;
    const newNameFile = `${namefile}${finalExt}`;
    callback(null, newNameFile);
  },
});

const StorageProducts = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "src/uploads/products");
  },
  filename(req, file, callback) {
    const namefile = Date.now() + Math.floor(Math.random() * 10000);
    const ext = path.extname(file.originalname);
    const finalExt = ext === ".jfif" ? ".webp" : ext;
    const newNameFile = `${namefile}${finalExt}`;
    callback(null, newNameFile);
  },
});

const StorageReviwes = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "src/uploads/reviews");
  },
  filename(req, file, callback) {
    const namefile = Date.now() + Math.floor(Math.random() * 10000);
    const ext = path.extname(file.originalname);
    const finalExt = ext === ".jfif" ? ".webp" : ext;
    const newNameFile = `${namefile}${finalExt}`;
    callback(null, newNameFile);
  },
});

const UserUploads = multer({ storage: StorageUser });
const ProductsUploads = multer({ storage: StorageProducts });
const ReviewsUploads = multer({ storage: StorageReviwes });

export { UserUploads, ProductsUploads, ReviewsUploads };
