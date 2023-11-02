import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';

export default class DashboardService {
  options: IServiceOptions;
  private timeToGather: number;

  constructor(options) {
    this.options = options;
    this.timeToGather = 0;
  }

  async measureElapsedTime(operation: () => Promise<any>) {
    const startTime = process.hrtime();
    const responseData = await operation();
    const stopTime = process.hrtime(startTime);
    const elapsedTime = (stopTime[0] * 1e9 + stopTime[1]) / 1e6; // Convert to milliseconds
    this.timeToGather += elapsedTime;
    return responseData;
  }

  async getUsageByHoursData() {
    return this.measureElapsedTime(() =>
      SequelizeRepository.getUsageByHoursData(this.options)
    );
  }

  async getNumberOfPeoplePerRole() {
    return this.measureElapsedTime(() =>
      SequelizeRepository.getNumberOfPeoplePerRole(this.options)
    );
  }

  async getUsageByPeopleData() {
    return this.measureElapsedTime(() =>
      SequelizeRepository.getUsageByPeopleData(this.options)
    );
  }

  async getIdlenessPerRoleData() {
    return this.measureElapsedTime(() =>
      SequelizeRepository.getIdlenessPerRoleData(this.options)
    );
  }

  getGatheringTime() {
    return this.timeToGather;
  }
}
