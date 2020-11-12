import { HttpService } from '@nestjs/common';
import { CreateForecastDto } from './dto/create-forecast.dto';
import { UpdateForecastDto } from './dto/update-forecast.dto';
export declare class ForecastService {
    private httpService;
    constructor(httpService: HttpService);
    create(createForecastDto: CreateForecastDto): string;
    findAll(): Promise<{}>;
    findOne(day: number): Promise<{}>;
    update(id: number, updateForecastDto: UpdateForecastDto): string;
    remove(id: number): string;
}
