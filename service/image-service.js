const ImageModel = require('../models/image-model')
const ApiError = require('../exceptions/api-error')

class ImageService {

    async createImage(author, file, ipAddress) {
        if (!author) {
            throw ApiError.BadRequest('Author not selected. Check for login & try again')
        }
        if (!file) {
            throw  ApiError.BadRequest('Ups, your image where lost, please try again')
        }
        const {filename} = file;
        const src = filename;

        const image = new ImageModel({
            date: Date.now(),
            author,
            src: `${process.env.CLIENT_URL + '/uploads/' + src}`,
            ipAddress,
            label: '',
        });
        image.save();

        return image
    }

    async updateImage(imageId, label) {
        const updated = ImageModel.findOneAndUpdate({_id: imageId}, {label: label}, {new: true})
        if (!updated) {
            throw ApiError.BadRequest('Ups, failed to update label, please try again')
        }
        return updated
    }

    async deleteImage(imageId) {
        const deleted = ImageModel.findOneAndUpdate({_id: imageId}, {isDeleted: true}, {new: true})
        if (!deleted) {
            throw ApiError.BadRequest('Ups, failed to delete image, please try again')
        }
        return deleted
    }

    async groupImagesByAuthorAndTime(authorId) {
        const images = await ImageModel.find({author: authorId, isDeleted: false});
        if (!images || !images.length) {
            throw ApiError.BadRequest('User has no images');
        }
        const groupedImages = {};

        images.forEach(image => {
            const dateInSeconds = Math.floor(image.date / 1000);

            const dateObj = new Date(dateInSeconds * 1000);
            const year = dateObj.getFullYear();
            const month = dateObj.getMonth() + 1;
            const key = `${year}-${month}`;

            if (!groupedImages[key]) {
                const startOfMonth = new Date(dateInSeconds * 1000);
                startOfMonth.setDate(1);
                startOfMonth.setHours(0, 0, 0, 0);

                groupedImages[key] = {
                    date: Math.floor(startOfMonth / 1000),
                    photos: []
                };
            }

            groupedImages[key].photos.push(image);
        });

        // Изменена сортировка на убывание
        const result = Object.values(groupedImages).sort((a, b) => b.date - a.date);

        return result;
    }

    async getImagePath(imageId) {
        const image = await ImageModel.findById(imageId);

        if (!image) {
            throw ApiError.BadRequest('Image not found');
        }

        return image.src;
    }

}

module.exports = new ImageService();