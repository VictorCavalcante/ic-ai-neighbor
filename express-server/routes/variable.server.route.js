// ./express-server/routes/variable.server.route.js
import express from 'express';

//import controller file
import * as variableController from '../controllers/variable.server.controller';

// get an instance of express router
const router = express.Router();

router.route('/')
     .get(variableController.getVariables)
     .post(variableController.addVariable)
     .put(variableController.updateVariable);

router.route('/:id')
      .get(variableController.getVariable)
      .delete(variableController.deleteVariable);


export default router;
