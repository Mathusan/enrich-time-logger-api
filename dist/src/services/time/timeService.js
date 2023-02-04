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
exports.getCurrentProjectervice = exports.updateTimeEntryService = exports.createTimeEntryService = void 0;
const time_repository_1 = require("../../database/repository/time.repository");
const createTimeEntryService = (timeInputs) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, project } = timeInputs;
        const time = new Date();
        const entry = yield (0, time_repository_1.createTimeEntryRepo)(id, project, time);
        return entry;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createTimeEntryService = createTimeEntryService;
const updateTimeEntryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const time = new Date();
        yield (0, time_repository_1.updateTimeEntryRepo)(id, time);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updateTimeEntryService = updateTimeEntryService;
const getCurrentProjectervice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield (0, time_repository_1.getCurrentProjectRepo)(id);
        return project;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getCurrentProjectervice = getCurrentProjectervice;
