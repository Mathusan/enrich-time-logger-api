"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importStar(require("mongoose"));
const locations = ['33 French Street', 'Bromley, West Wickham', 'Willoughby Road', 'Watford Project', 'NW9 - Bathroom]'];
const timeSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: function () {
            return new mongodb_1.ObjectId().toString();
        }
    },
    date: { type: Date, required: true, default: Date.now() },
    location: { type: String, required: true },
    startTime: { type: Date, required: true },
    finishTime: { type: Date },
    InProgress: { type: Boolean, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
});
exports.default = (0, mongoose_1.model)("Time", timeSchema);
