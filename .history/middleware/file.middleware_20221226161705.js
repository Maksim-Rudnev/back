require('dotenv').config();
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
} = require('../constants/responseStatuses');

module.exports = {
  async fileMiddleware(req, res, next) {
    try {
      const {
        files,
        baseUrl,
      } = req;

      if (files) {
        const { file } = files;
        if (!file.mimetype.match(/image[/](?=png|jpg|jpeg|gif)/)) {
          return res.status(BAD_REQUEST).send({ message: 'Uploaded file is not an image' });
        }

        const fileName = file.name.split('.');
        fileName[0] += Date.now();
        const dateName = fileName.join('.');
        console.log(baseUrl);
        const folder = baseUrl === 'api/users' ? 'avatar' : 'image';
        console.log(baseUrl);
        const filePath = `${process.env.FILE_PATH}/${folder}/${dateName}`;
        await file.mv(filePath);
        req.file = dateName;
      }

      return next();
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'error', error });
    }
  },
};
