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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentTaskRepo = exports.getCurrentTaskRepo = exports.removeRefreshTokenRepo = exports.findUserByIdRepo = exports.saveRefreshTokenRepo = exports.findUserByTokenRepo = exports.findUserRepo = exports.createUserRepo = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createUserRepo = ({ name, phone, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_model_1.default({
            name,
            phone,
            password,
            role: 'Employee'
        });
        yield user.save();
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createUserRepo = createUserRepo;
const findUserRepo = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_model_1.default.findOne({ phone: phone });
        return existingUser;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.findUserRepo = findUserRepo;
const findUserByTokenRepo = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_model_1.default.findOne({ refreshToken });
        return existingUser;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.findUserByTokenRepo = findUserByTokenRepo;
const saveRefreshTokenRepo = (userID, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(userID).findOneAndUpdate({ refreshToken: refreshToken });
        yield (user === null || user === void 0 ? void 0 : user.save());
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.saveRefreshTokenRepo = saveRefreshTokenRepo;
const findUserByIdRepo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_model_1.default.findById(id).select('-password').select('-refreshToken');
        return existingUser;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.findUserByIdRepo = findUserByIdRepo;
const removeRefreshTokenRepo = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, exports.findUserByTokenRepo)(refreshToken);
        if (user) {
            user.refreshToken = '';
            yield user.save();
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.removeRefreshTokenRepo = removeRefreshTokenRepo;
const getCurrentTaskRepo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (user === null || user === void 0 ? void 0 : user.lastTask) {
        return user === null || user === void 0 ? void 0 : user.lastTask;
    }
    else {
        return '';
    }
});
exports.getCurrentTaskRepo = getCurrentTaskRepo;
const setCurrentTaskRepo = (id, timeId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id).findOneAndUpdate({ lastTask: timeId });
    yield (user === null || user === void 0 ? void 0 : user.save());
});
exports.setCurrentTaskRepo = setCurrentTaskRepo;
