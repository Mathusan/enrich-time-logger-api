import { Request, Response , NextFunction } from "express"
import { createTimeEntryService , updateTimeEntryService , getCurrentProjectervice} from "../../services/time/timeService"
import { getCurrentTaskOfUserService, setCurrentTaskOfUserService } from "../../services/user/userService"
//import {}

//  newTimeController,timesController , updateTimerController , deleteTimerController


export interface CustomRequest extends Request {
    user: {
        id : string
    }
   }


export  const getTaskInProgress = async (req :Request , res : Response , next : NextFunction) => { 
    try {
        const {id} = (req as CustomRequest).user 
        const taskId = await getCurrentTaskOfUserService(id);
        const taskProject  = await getCurrentProjectervice(taskId);
    
        res.json({taskId,   
        project : taskProject})
        
    } catch (error) {
        next(error)
    }

}   



export const newTimeController = async (req : Request ,res : Response ,next : NextFunction) => { 
    try {
        const {id} = (req as CustomRequest).user 
        const {project} = req.body
    
        const entry =await createTimeEntryService({id , project})
        await setCurrentTaskOfUserService(id, entry.id)
        // await add currenttask to user
        res.json({
            entry
        })
    } catch (error) {
        next(error)
    }


}

export const getTimesController = async (req : Request ,res : Response ,next : NextFunction) => { 

}

export const updateTimerController = async (req : Request ,res : Response ,next : NextFunction) => { 
    try {
        const {id} = (req as CustomRequest).user 
        const taskId = req.params.id;
        await updateTimeEntryService(taskId)
        await setCurrentTaskOfUserService(id,'')
        //remove currenttask from user
        res.send('success')
        
    } catch (error) {
        next(error)
    }
    

}

export const deleteTimerController = async (req : Request ,res : Response ,next : NextFunction) => { 

}