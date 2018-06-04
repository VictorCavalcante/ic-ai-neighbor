// ./express-server/routes/variable.server.route.js
import express from 'express';

//import controller file
import * as mlAPIController from '../controllers/mlapi.server.controller';

// get an instance of express router
const router = express.Router();

router.route('/training')
     .get(mlAPIController.trainDataset);


export default router;
