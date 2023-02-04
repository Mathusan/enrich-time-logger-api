"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
exports.default = {
    dbURL: process.env.DATABASE_URL,
    port: process.env.PORT,
    accessTokenKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    salt: process.env.SALT
};
