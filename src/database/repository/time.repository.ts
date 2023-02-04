import timeModel from "../models/timetrack.model";

export const createTimeEntryRepo = async (id: any , project : any , time : Date) => {
    try {
        const timeEntry = new timeModel({
            location :project,
            startTime : time ,
            InProgress : true,
            userId : id
        })

        await timeEntry.save()
        return timeEntry

    } catch (error : any) {
        throw new Error(error)
    }
}


export const updateTimeEntryRepo =async (id : string , time : Date) => {
    try {
        const timeEntry : any= await timeModel.findById(id).findOneAndUpdate({InProgress: false , finishTime : time})
        await timeEntry?.save()
    } catch (error : any) {
        throw new Error(error)
    }
}


export const getCurrentProjectRepo =async (id : string ) => {
    try {
        const timeEntry : any= await timeModel.findById(id)
        return timeEntry.location
    } catch (error : any) {
        throw new Error(error)
    }
}
