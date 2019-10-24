const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	region: 'ap-northeast-2'
});

const awsS3ImageUpload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.AWS_BUCKET_NAME,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		acl: 'public-read',
		key: function(req, file, cb) {
			cb(null, Date.now().toString() + file.originalname);
		}
	}),
	limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = { awsS3ImageUpload };
