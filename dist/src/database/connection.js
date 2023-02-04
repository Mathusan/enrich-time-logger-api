"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
exports.default = () => {
    mongoose_1.default.connect(`${config_1.default.dbURL}`, {
        useNewUrlParser: true
    });
    console.log('Db Connected');
    mongoose_1.default.connection.on("error", (e) => {
        console.error(`Error ${e}`);
    });
};
