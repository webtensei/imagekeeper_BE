const Router = require('express')
const imageController = require('../controllers/image-controller')
const router = new Router()
const uuid = require('uuid')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').pop(); // Получаем расширение файла
        const uniqueFilename = `${uuid.v4()}.${extension}`;
        cb(null, uniqueFilename);
    },
});
const upload = multer({ storage: storage });

router.post('/images',upload.single('image'), imageController.createImage);

router.put('/images/:imageId', imageController.updateImage);

router.delete('/images/:imageId', imageController.deleteImage);

router.get('/authors/:authorId/images', imageController.groupImagesByAuthorAndTime);

router.get('/images/:imageId/download', imageController.downloadImage);

module.exports = router
