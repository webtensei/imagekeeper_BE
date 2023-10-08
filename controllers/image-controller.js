const imageService = require('../service/image-service');

class ImageController {

    async createImage(req, res, next) {
        try {

            const { author } = req.body;
            const ipAddress = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            const file = req.file;

            const image = await imageService.createImage(author, file, ipAddress);

            res.status(201).json(image);
        } catch (e) {
            next(e)
        }
    }

    async updateImage(req, res, next) {
        try {
            const { imageId } = req.params;
            const { label } = req.body;
            const updatedImage = await imageService.updateImage(imageId, label);

            res.status(200).json(updatedImage);
        } catch (e) {
            next(e)
        }
    }

    async deleteImage(req, res, next) {
        try {
            const { imageId } = req.params;
            const deletedImage = await imageService.deleteImage(imageId);


            res.status(204).send(); // No content response for successful deletion
        } catch (e) {
            next(e)
        }
    }

    async groupImagesByAuthorAndTime(req, res, next) {
        try {
            const { authorId } = req.params;
            const images = await imageService.groupImagesByAuthorAndTime(authorId);
            res.status(200).json(images);
        } catch (e) {
            next(e)
        }
    }
    async  downloadImage(req, res, next) {
        try {
            const { imageId } = req.params;
            const imagePath = await imageService.getImagePath(imageId);

            // Отправляем файл для скачивания с установленным заголовком Content-Disposition
            res.download(imagePath, 'image.jpg', (err) => {
                if (err) {
                    res.status(500).json({ error: 'Ошибка при скачивании изображения' });
                }
            });
        } catch (e) {
            next(e);
        }
    }


}

module.exports = new ImageController();