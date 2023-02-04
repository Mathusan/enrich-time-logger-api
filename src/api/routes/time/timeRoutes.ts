import express, {Router} from 'express'
import passport from 'passport'
import { ROLES } from '../../../utils'
import { checkIsInRole } from '../../middlewares/rolebasedMiddleware'
import { newTimeController,getTimesController , updateTimerController , deleteTimerController, getTaskInProgress } from '../../controllers/timeController'

const timeRouter : Router = express.Router()


timeRouter.post('/entry',passport.authenticate('jwt', { session : false}), newTimeController) // create new time entry
timeRouter.get('/lasttask',passport.authenticate('jwt', { session : false}),getTaskInProgress)
timeRouter.get('entries',passport.authenticate('jwt', { session : false}) , getTimesController) // get all time entries for user
timeRouter.put('/entry/:id' ,passport.authenticate('jwt', { session : false}) ,updateTimerController ) // update time entry 
timeRouter.delete('/entry/:id', passport.authenticate('jwt', { session : false}) , deleteTimerController  ) // delete time entry 


export default timeRouter
