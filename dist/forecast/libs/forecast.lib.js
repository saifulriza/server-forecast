"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kalkulasi = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const moment = require("moment");
const httpService = new common_1.HttpService;
let debug = false;
const tglHariIni = moment(Date.now()).toDate().getDate();
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
const data = httpService.get('https://api.coinranking.com/v1/public/coin/1/history/30d?base=IDR').pipe(operators_1.map(res => {
    return res.data;
})).toPromise();
async function kalkulasi(day = 0) {
    let hasilGabung = [];
    let hasilForecastKedepan = {};
    const prediksiHariKedepan = day;
    await data.then((res) => {
        let response = res.data.history;
        var hasil = [];
        for (var i = 0; i < 720; ++i) {
            hasil[i] = [];
        }
        response.forEach((x, i) => {
            const date = moment(x.timestamp).toDate().getDate();
            for (let i = 1; i <= tglHariIni; i++) {
                if (date == i) {
                    let obj = {
                        timestamp: x.timestamp,
                        price: x.price
                    };
                    hasil[i].push(obj);
                }
            }
        });
        const alpha = 0.450;
        const beta = 1 - alpha;
        let hasilSmoothPertama = [];
        let hasilSmoothKedua = [];
        let tempSmoothPertama;
        let tempSmoothKedua;
        let objSmoothPertama;
        let objSmoothKedua;
        let smoothPertama;
        let smoothKedua;
        let konstanta;
        let hasilKonstanta = [];
        let slope;
        let hasilSlope = [];
        let forecast;
        let hasilForecast = [];
        let forecastKedepan;
        let error;
        let hasilError = [];
        let objKonstanta;
        let objSlope;
        let objError;
        let objForecast;
        let objForecastKedepan;
        let curSmoothPertama;
        let objGabung;
        for (let i = 1; i <= tglHariIni; i++) {
            if (typeof hasil[i] !== "undefined") {
                let curDataSmoothPertama = true;
                for (let j = 0; j <= hasil[i].length; j++) {
                    if (typeof hasil[i][j] !== "undefined") {
                        const tgl = hasil[i][j].timestamp;
                        if (curDataSmoothPertama) {
                            tempSmoothPertama = parseFloat(hasil[i][j].price);
                            tempSmoothKedua = parseFloat(hasil[i][j].price);
                            objSmoothPertama = {
                                tanggal: tgl,
                                hasil: tempSmoothPertama
                            };
                            curDataSmoothPertama = false;
                        }
                        else {
                            curSmoothPertama = tempSmoothPertama !== "" ? tempSmoothPertama : smoothPertama;
                            smoothPertama = alpha * hasil[i][j].price + beta * curSmoothPertama;
                            tempSmoothPertama = "";
                            objSmoothPertama = {
                                tanggal: tgl,
                                hasil: smoothPertama
                            };
                            smoothKedua = alpha * smoothPertama + beta * curSmoothPertama;
                            tempSmoothKedua = "";
                            objSmoothKedua = {
                                tanggal: tgl,
                                hasil: smoothKedua
                            };
                            konstanta = 2 * smoothPertama - smoothKedua;
                            objKonstanta = {
                                tanggal: tgl,
                                konstanta: konstanta
                            };
                            slope = (alpha / beta) * (smoothPertama - smoothKedua);
                            objSlope = {
                                tanggal: tgl,
                                slope: slope
                            };
                        }
                        forecast = konstanta + slope;
                        objForecast = {
                            tanggal: tgl,
                            forecast: forecast
                        };
                        forecastKedepan = konstanta + slope * prediksiHariKedepan;
                        const date = new Date();
                        objForecastKedepan = {
                            tanggal: date.addDays(prediksiHariKedepan),
                            forecast: forecastKedepan
                        };
                        error = ((hasil[i][j].price - forecast) / hasil[i][j].price) * 100;
                        objError = {
                            tanggal: tgl,
                            error: error + "%"
                        };
                        objGabung = {
                            tgl: tgl,
                            asli: parseFloat(hasil[i][j].price),
                            forecast: forecast,
                            smoothPertama: smoothPertama,
                            smoothKedua: smoothKedua,
                            konstanta: konstanta,
                            slope: slope,
                            error: error,
                        };
                        if (debug) {
                            console.log("smooth pertama = alpha :" + alpha + " * hasil[i][j].price : " + hasil[i][j].price + " + beta : " + beta + "* curPrediksi :" + curSmoothPertama + " = " + smoothPertama);
                            console.log("smooth kedua = alpha :" + alpha + " * smoothPertama : " + smoothPertama + " + beta : " + beta + "* curPrediksi :" + curSmoothPertama + " = " + smoothKedua);
                            console.log("konstanta : 2 * " + smoothPertama + " - " + smoothKedua + " = " + konstanta);
                            console.log("slope = alpha :" + alpha + "beta :" + beta + "*(smooth pertama :" + smoothPertama + "smoth kedua : " + smoothKedua + ") = " + slope);
                            console.log("forecast = kontsanta :" + konstanta + " + slope" + slope + " =" + forecast);
                            console.log("forecast = kontsanta :" + konstanta + " + slope" + slope + "* 31 =" + forecastKedepan);
                            console.log("error = ( hasil[i][j] :" + hasil[i][j].price + "-" + "forecast :" + forecast + ")/ hasil[i][j].price :" + hasil[i][j].price + ") *" + 100);
                        }
                    }
                }
                hasilSmoothPertama.push(objSmoothPertama);
                hasilSmoothKedua.push(objSmoothKedua);
                hasilKonstanta.push(objKonstanta);
                hasilSlope.push(objSlope);
                hasilForecast.push(objForecast);
                hasilError.push(objError);
                hasilForecastKedepan = objForecastKedepan;
                hasilGabung.push(objGabung);
            }
        }
    });
    if (prediksiHariKedepan > 0) {
        return hasilForecastKedepan;
    }
    else {
        return hasilGabung;
    }
}
exports.kalkulasi = kalkulasi;
//# sourceMappingURL=forecast.lib.js.map