import multer from "multer";

// Configure the storage for multer
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        const name = Date.now() + "_" + file.originalname; // Referencing 'file' correctly
        cb(null, name);
    }
});

// Exporting the uploadFile middleware
const uploadFile = multer({
    storage: storageConfig
});

export default uploadFile;
