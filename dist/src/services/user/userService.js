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
exports.setCurrentTaskOfUserService = exports.getCurrentTaskOfUserService = exports.userFindByIDService = exports.RefreshTokenService = exports.logoutUserService = exports.loginUserService = exports.registerUserService = void 0;
const user_repository_1 = require("../../database/repository/user.repository");
const utils_1 = require("../../utils");
const errorHandler_1 = require("../../utils/errorHandler");
const registerUserService = (userInputs) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, password } = userInputs;
    const checkExistingUser = yield (0, user_repository_1.findUserRepo)(phone);
    if (!checkExistingUser) {
        let hashedPassword = yield (0, utils_1.generatePassword)(password);
        const newUser = yield (0, user_repository_1.createUserRepo)({ name, phone, password: hashedPassword });
        const accessToken = yield (0, utils_1.generateToken)({ phone: newUser.phone, id: newUser.id, role: newUser.role });
        const refreshToken = yield (0, utils_1.generateRefreshToken)({ name: newUser.name, id: newUser.id });
        yield (0, user_repository_1.saveRefreshTokenRepo)(newUser.id, refreshToken);
        return { id: newUser.id, accessToken, name: newUser.name, refreshToken };
    }
    else {
        throw new errorHandler_1.AppError(409, "Phone Already Registered");
    }
});
exports.registerUserService = registerUserService;
const loginUserService = (userInputs) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = userInputs;
    const existingUser = yield (0, user_repository_1.findUserRepo)(phone);
    if (existingUser) {
        const validatedPassword = yield (0, utils_1.validatePassword)(password, existingUser.password);
        if (validatedPassword) {
            const accessToken = yield (0, utils_1.generateToken)({ phone: existingUser.phone, id: existingUser.id, role: existingUser.role });
            const refreshToken = yield (0, utils_1.generateRefreshToken)({ name: existingUser.name, id: existingUser.id });
            yield (0, user_repository_1.saveRefreshTokenRepo)(existingUser.id, refreshToken);
            return { id: existingUser.id, name: existingUser.name, accessToken, refreshToken };
        }
        else {
            throw new errorHandler_1.AppError(401, "Incorrect Password");
        }
    }
    else {
        throw new errorHandler_1.AppError(401, "User not found");
    }
});
exports.loginUserService = loginUserService;
const logoutUserService = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_repository_1.removeRefreshTokenRepo)(refreshToken);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.logoutUserService = logoutUserService;
const RefreshTokenService = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_repository_1.findUserByTokenRepo)(refreshToken);
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.RefreshTokenService = RefreshTokenService;
const userFindByIDService = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_repository_1.findUserByIdRepo)(userID);
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.userFindByIDService = userFindByIDService;
const getCurrentTaskOfUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = yield (0, user_repository_1.getCurrentTaskRepo)(id);
        return taskId;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getCurrentTaskOfUserService = getCurrentTaskOfUserService;
const setCurrentTaskOfUserService = (id, taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_repository_1.setCurrentTaskRepo)(id, taskId);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.setCurrentTaskOfUserService = setCurrentTaskOfUserService;
