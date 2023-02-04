"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorHandler_1 = require("../../utils/errorHandler");
const logger_1 = require("../../utils/logger");
const handleKnownExceptions = (err, res) => {
    const { statusCode, message } = err;
    logger_1.logger.log('error', message);
    res.status(statusCode).json({ error: { message } });
};
const handleUnknownExceptions = (err, res) => {
    logger_1.logger.log('error', err.message);
    res.status(500).json({ error: { message: 'Something went wrong.' } });
};
const errorMiddleware = (err, req, res, next) => {
    err instanceof errorHandler_1.AppError ? handleKnownExceptions(err, res) : handleUnknownExceptions(err, res);
};
exports.errorMiddleware = errorMiddleware;
