import { ApplicationError } from '../utils/ApiError';
import { Service } from 'typedi';
import TrainLineRepository from '../repositories/TrainLineRepository';
import { LoggerClient } from './LoggerClient';
import { TrainLine } from '../models/TrainLine';

@Service()
export default class UserService {
  constructor(public trainLineRepository: TrainLineRepository, public logger: LoggerClient) {}

  createTrain = async (name: string) => {
    const result = this.trainLineRepository.createTrainLine(name);
    return result;
  };

  // signIn = async (email: string, password: string) => {
  //   this.logger.info(`Email of the registered trainLine is ${email}`);
  //   const trainLineWithEmail: TrainLine | null = await this.trainLineRepository.findByEmail(email);
  //   if (!trainLineWithEmail) {
  //     throw new ApplicationError('No TrainLine found with this email');
  //   }
  //   if (trainLineWithEmail.password.toString() !== password) {
  //     throw new ApplicationError('Password did not match');
  //   }
  //   return 'Successfully Signed In';
  // };

  getAllTrainLines = async () => {
    return await this.trainLineRepository.getAllTrainLines();
  };
}
