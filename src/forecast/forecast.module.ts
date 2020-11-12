import { HttpModule, Module } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { ForecastController } from './forecast.controller';

@Module({
  imports: [HttpModule],
  controllers: [ForecastController],
  providers: [ForecastService]
})
export class ForecastModule {}
