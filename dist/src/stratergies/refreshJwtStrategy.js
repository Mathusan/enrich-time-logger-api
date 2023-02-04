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
exports.initializeRefreshJwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("../../config"));
const userService_1 = require("../services/user/userService");
const utils_1 = require("../utils");
const initializeRefreshJwtStrategy = (passport) => {
    passport.use('refresh-jwt', new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([(request) => {
                let data = request === null || request === void 0 ? void 0 : request.cookies['jwt'];
                if (!data) {
                    return null;
                }
                return data;
            }]),
        secretOrKey: config_1.default.refreshTokenKey,
    }, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, userService_1.userFindByIDService)(payload.id);
            const accessToken = yield (0, utils_1.generateToken)({ phone: user.phone, id: user.id, role: user.role });
            return done(null, accessToken);
        }
        catch (error) {
            return done(null, false, { message: error.message });
        }
    })));
};
exports.initializeRefreshJwtStrategy = initializeRefreshJwtStrategy;
