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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastService = void 0;
const common_1 = require("@nestjs/common");
const forecast_lib_1 = require("./libs/forecast.lib");
let ForecastService = class ForecastService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    create(createForecastDto) {
        return 'This action adds a new forecast';
    }
    findAll() {
        return forecast_lib_1.kalkulasi();
    }
    findOne(day) {
        return forecast_lib_1.kalkulasi(day);
    }
    update(id, updateForecastDto) {
        return `This action updates a #${id} forecast`;
    }
    remove(id) {
        return `This action removes a #${id} forecast`;
    }
};
ForecastService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], ForecastService);
exports.ForecastService = ForecastService;
//# sourceMappingURL=forecast.service.js.map