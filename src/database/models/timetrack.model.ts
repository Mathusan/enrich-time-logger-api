import { ObjectId } from "mongodb";
import mongoose, { model, Schema } from "mongoose"; 

const locations = ['33 French Street','Bromley, West Wickham','Willoughby Road','Watford Project','NW9 - Bathroom]']

const timeSchema: Schema = new Schema({

    _id: {
        type: String,
        default: function () {
            return new ObjectId().toString()
        }
    },
    date :{type :Date , required: true ,default :Date.now()},

    location : {type :String , required : true},

    startTime : {type : Date ,  required : true},

    finishTime : {type : Date },

    InProgress : { type : Boolean , required : true},

    userId: { type : mongoose.Schema.Types.ObjectId , ref: 'User' , required : true},

  
});

export default model("Time", timeSchema);