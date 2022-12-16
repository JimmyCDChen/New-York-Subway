import express from 'express';
import RequestValidator from '../middlewares/RequestValidator';
import { Container } from 'typedi';
import TrainLineController from '../controllers/TrainLineController';
import { TrainLineRequest } from '../requests/TrainLineRequest';

const router = express.Router();

/**
 * We are using TypeDI to get the UserService instance from our dependency container
 * More info: https://www.mohammadfaisal.dev/blog/dependency-injection-in-nodejs
 */
const trainLineController = Container.get(TrainLineController);

router.get('/', trainLineController.getAllTrainLines);
router.post('/', RequestValidator.validate(TrainLineRequest), trainLineController.createTrainLines);

export default router;
