import { ForecastService } from './forecast.service';
import { CreateForecastDto } from './dto/create-forecast.dto';
import { UpdateForecastDto } from './dto/update-forecast.dto';
export declare class ForecastController {
    private readonly forecastService;
    constructor(forecastService: ForecastService);
    create(createForecastDto: CreateForecastDto): string;
    findAll(): Promise<{}>;
    findOne(day: string): Promise<{}>;
    update(id: number, updateForecastDto: UpdateForecastDto): string;
    remove(id: string): string;
}
