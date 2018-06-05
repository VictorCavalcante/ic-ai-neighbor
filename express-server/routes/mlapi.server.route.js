import express from 'express';

import * as mlAPIController from '../controllers/mlapi.server.controller';

const router = express.Router();

router.route('/accuracy')
     .get(mlAPIController.testAccuracy);

router.route('/predict')
     .get(mlAPIController.predictType);

export default router;
