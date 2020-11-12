"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateForecastDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_forecast_dto_1 = require("./create-forecast.dto");
class UpdateForecastDto extends mapped_types_1.PartialType(create_forecast_dto_1.CreateForecastDto) {
}
exports.UpdateForecastDto = UpdateForecastDto;
//# sourceMappingURL=update-forecast.dto.js.map