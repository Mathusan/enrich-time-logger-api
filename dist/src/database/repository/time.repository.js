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
exports.getCurrentProjectRepo = exports.updateTimeEntryRepo = exports.createTimeEntryRepo = void 0;
const timetrack_model_1 = __importDefault(require("../models/timetrack.model"));
const createTimeEntryRepo = (id, project, time) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timeEntry = new timetrack_model_1.default({
            location: project,
            startTime: time,
            InProgress: true,
            userId: id
        });
        yield timeEntry.save();
        return timeEntry;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createTimeEntryRepo = createTimeEntryRepo;
const updateTimeEntryRepo = (id, time) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timeEntry = yield timetrack_model_1.default.findById(id).findOneAndUpdate({ InProgress: false, finishTime: time });
        yield (timeEntry === null || timeEntry === void 0 ? void 0 : timeEntry.save());
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updateTimeEntryRepo = updateTimeEntryRepo;
const getCurrentProjectRepo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timeEntry = yield timetrack_model_1.default.findById(id);
        return timeEntry.location;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getCurrentProjectRepo = getCurrentProjectRepo;
