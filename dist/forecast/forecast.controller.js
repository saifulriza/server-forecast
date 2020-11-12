"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastController = void 0;
const common_1 = require("@nestjs/common");
const forecast_service_1 = require("./forecast.service");
const create_forecast_dto_1 = require("./dto/create-forecast.dto");
const update_forecast_dto_1 = require("./dto/update-forecast.dto");
let ForecastController = class ForecastController {
    constructor(forecastService) {
        this.forecastService = forecastService;
    }
    create(createForecastDto) {
        return this.forecastService.create(createForecastDto);
    }
    findAll() {
        return this.forecastService.findAll();
    }
    findOne(day) {
        return this.forecastService.findOne(+day);
    }
    update(id, updateForecastDto) {
        return this.forecastService.update(+id, updateForecastDto);
    }
    remove(id) {
        return this.forecastService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_forecast_dto_1.CreateForecastDto]),
    __metadata("design:returntype", void 0)
], ForecastController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ForecastController.prototype, "findAll", null);
__decorate([
    common_1.Get(':day'),
    __param(0, common_1.Param('day')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForecastController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_forecast_dto_1.UpdateForecastDto]),
    __metadata("design:returntype", void 0)
], ForecastController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForecastController.prototype, "remove", null);
ForecastController = __decorate([
    common_1.Controller('forecast'),
    __metadata("design:paramtypes", [forecast_service_1.ForecastService])
], ForecastController);
exports.ForecastController = ForecastController;
//# sourceMappingURL=forecast.controller.js.map