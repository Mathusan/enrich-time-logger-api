import {createTimeEntryRepo , updateTimeEntryRepo , getCurrentProjectRepo} from '../../database/repository/time.repository'

export interface timeCreateInputs {
    id : string,
    project : string
  }


export const createTimeEntryService = async (timeInputs: timeCreateInputs)=> {
    try {
        const { id , project} = timeInputs
        const time = new Date();
        const entry = await createTimeEntryRepo(id,project,time)
        return entry
    } catch (error : any) {
        throw new Error(error)
    }
}

export const updateTimeEntryService = async (id : any )=> {
    try {
        const time = new  Date()
        await updateTimeEntryRepo(id, time)
    } catch (error : any) {
        throw new Error(error)

    }
}

export const getCurrentProjectervice= async (id : any )=> {
    try {
        const project = await getCurrentProjectRepo(id)
        return project
    } catch (error : any) {
        throw new Error(error)

    }
}

