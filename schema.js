const Joi = require('joi');
const Listing = require('./models/listing');

module.exports.listingSchema = Joi.object({
   listing: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      location: Joi.string().required(),
      country: Joi.string().required(),
      price: Joi.number().required().min(0),
      image: Joi.object({
         url: Joi.string().allow("", null)
      }),


   }).required()

});

module.exports.reviewSchema = Joi.object({
   review: Joi.object({
      comment: Joi.string().required(),
      rating: Joi.number().required().min(1).max(5),
   }).required(),
});


/*
#npm error code ERESOLVE
npm error ERESOLVE could not resolve
npm error
npm error While resolving: multer-storage-cloudinary@4.0.0
npm error Found: cloudinary@2.9.0
npm error node_modules/cloudinary
npm error   cloudinary@"^2.9.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer cloudinary@"^1.21.0" from multer-storage-cloudinary@4.0.0
npm error node_modules/multer-storage-cloudinary
npm error   multer-storage-cloudinary@"^4.0.0" from the root project
npm error
npm error Conflicting peer dependency: cloudinary@1.41.3
npm error node_modules/cloudinary
npm error   peer cloudinary@"^1.21.0" from multer-storage-cloudinary@4.0.0
npm error   node_modules/multer-storage-cloudinary
npm error     multer-storage-cloudinary@"^4.0.0" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
npm error
npm error
npm error For a full report see:
npm error /opt/render/.cache/_logs/2026-02-28T16_49_29_595Z-eresolve-report.txt
npm error A complete log of this run can be found in: /opt/render/.cache/_logs/2026-02-28T16_49_29_595Z-debug-0.log
==> Build failed 😞
==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
# */