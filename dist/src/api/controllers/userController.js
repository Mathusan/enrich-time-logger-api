"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRouteController = exports.logoutUserController = exports.refreshTokenController = exports.loginUserController = exports.registerUserController = void 0;
const userService_1 = require("../../services/user/userService");
const registerUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, password } = req.body;
        const data = yield (0, userService_1.registerUserService)({ name, phone, password });
        res.cookie('jwt', data.refreshToken, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
        return res.json({
            accessToken: data.accessToken
        });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accessToken, refreshToken } = req === null || req === void 0 ? void 0 : req.user;
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
        return res.json({
            accessToken
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUserController = loginUserController;
const refreshTokenController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            accessToken: req.user
        });
    }
    catch (error) {
        next(error);
    }
});
exports.refreshTokenController = refreshTokenController;
const logoutUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(204);
        const refreshToken = cookies.jwt;
        yield (0, userService_1.logoutUserService)(refreshToken);
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: true });
        return res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.logoutUserController = logoutUserController;
const protectedRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userService_1.userFindByIDService)(req.user.id);
        res.status(200).json({
            name: user.name
        });
    }
    catch (error) {
        next(error);
    }
});
exports.protectedRouteController = protectedRouteController;
