import multer from "multer";

// Create multer upload instance
const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});
// Custom file upload middleware
const uploadMiddleware = (req, res, next) => {
  // Use multer upload instance
  upload.array("files", 3)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Retrieve uploaded files
    const files = req.files;
    const errors = [];

    // Validate file types and sizes
    // files.forEach((file) => {
    //   const allowedTypes = ["image/jpeg", "image/png"];
    //   const maxSize = 3 * 1024 * 1024; // 5MB

    //   if (!allowedTypes.includes(file.mimetype)) {
    //     errors.push(`Invalid file type: ${file.originalname}`);
    //   }

    //   if (file.size > maxSize) {
    //     errors.push(`File too large: ${file.originalname}`);
    //   }
    // });

    // Handle validation errors
    // if (errors.length > 0) {
    //   // Remove uploaded files
    //   files.forEach((file) => {
    //     fs.unlinkSync(file.path);
    //   });

    //   return res.status(400).json({ errors });
    // }

    // Attach files to the request object
    req.files = files;

    // Proceed to the next middleware or route handler
    next();
  });
};
export default uploadMiddleware;
