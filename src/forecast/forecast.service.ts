import { HttpService, Injectable } from '@nestjs/common';
import { CreateForecastDto } from './dto/create-forecast.dto';
import { UpdateForecastDto } from './dto/update-forecast.dto';
import { kalkulasi } from './libs/forecast.lib';


@Injectable()
export class ForecastService {
  constructor(private httpService: HttpService) { }

  create(createForecastDto: CreateForecastDto) {
    return 'This action adds a new forecast';
  }

  findAll() {
    return kalkulasi()
  }

  findOne(day: number) {
    return kalkulasi(day)
  }

  update(id: number, updateForecastDto: UpdateForecastDto) {
    return `This action updates a #${id} forecast`;
  }

  remove(id: number) {
    return `This action removes a #${id} forecast`;
  }




}
