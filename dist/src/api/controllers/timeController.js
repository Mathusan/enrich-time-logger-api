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
exports.deleteTimerController = exports.updateTimerController = exports.getTimesController = exports.newTimeController = exports.getTaskInProgress = void 0;
const timeService_1 = require("../../services/time/timeService");
const userService_1 = require("../../services/user/userService");
const getTaskInProgress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const taskId = yield (0, userService_1.getCurrentTaskOfUserService)(id);
        const taskProject = yield (0, timeService_1.getCurrentProjectervice)(taskId);
        res.json({ taskId,
            project: taskProject });
    }
    catch (error) {
        next(error);
    }
});
exports.getTaskInProgress = getTaskInProgress;
const newTimeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const { project } = req.body;
        const entry = yield (0, timeService_1.createTimeEntryService)({ id, project });
        yield (0, userService_1.setCurrentTaskOfUserService)(id, entry.id);
        // await add currenttask to user
        res.json({
            entry
        });
    }
    catch (error) {
        next(error);
    }
});
exports.newTimeController = newTimeController;
const getTimesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getTimesController = getTimesController;
const updateTimerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const taskId = req.params.id;
        yield (0, timeService_1.updateTimeEntryService)(taskId);
        yield (0, userService_1.setCurrentTaskOfUserService)(id, '');
        //remove currenttask from user
        res.send('success');
    }
    catch (error) {
        next(error);
    }
});
exports.updateTimerController = updateTimerController;
const deleteTimerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteTimerController = deleteTimerController;
