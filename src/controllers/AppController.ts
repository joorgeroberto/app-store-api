import { Request, Response, Express} from 'express';
import { getRepository } from 'typeorm';
import { App } from '../models/App';

interface IRequest {
  id: number;
  name: string;
  developer: string;
  rate: string;
  iconUrl: string;
  screenshotUrls: string[];
  description: string;
  category: {
    id: string;
    name: string;
  }
}

export class AppController {
  async find(_, response: Response) {
    const repository = getRepository(App);

    const apps = await repository.find()

    return response.json(apps);
  }

  async create(request: Request, response: Response) {
    const iRequest: IRequest[] = request.body;
    
    
    const repository = getRepository(App);

    const data = iRequest.map((el) => 
      repository.create({
        ...el
      })) 
      const savedData = await repository.save(data);
      return response.json(savedData);
  }

  async createScreenshots(request: Request, response: Response) {
  }

  async createIcon(request: Request, response: Response) {
    const image = request.file as Express.MulterS3.File;
    console.log(image)

    // const repository = getRepository(App);

    // const data = iRequest.map((el) => 
    //   repository.create({
    //     ...el
    //   })) 
    //   const savedData = await repository.save(data);
    //   return response.json(savedData);
    return response.json()
  }
}