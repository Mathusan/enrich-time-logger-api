"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utils_1 = require("../../utils");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String, required: false },
    role: { type: String, required: true, default: utils_1.ROLES.Employee },
    lastTask: { type: String }
});
exports.default = (0, mongoose_1.model)("User", userSchema);
