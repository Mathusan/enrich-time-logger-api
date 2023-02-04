"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const timeController_1 = require("../../controllers/timeController");
const timeRouter = express_1.default.Router();
timeRouter.post('/entry', passport_1.default.authenticate('jwt', { session: false }), timeController_1.newTimeController); // create new time entry
timeRouter.get('/lasttask', passport_1.default.authenticate('jwt', { session: false }), timeController_1.getTaskInProgress);
timeRouter.get('entries', passport_1.default.authenticate('jwt', { session: false }), timeController_1.getTimesController); // get all time entries for user
timeRouter.put('/entry/:id', passport_1.default.authenticate('jwt', { session: false }), timeController_1.updateTimerController); // update time entry 
timeRouter.delete('/entry/:id', passport_1.default.authenticate('jwt', { session: false }), timeController_1.deleteTimerController); // delete time entry 
exports.default = timeRouter;
