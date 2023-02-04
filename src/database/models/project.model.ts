import mongoose, { model, Schema } from "mongoose";


const projectSchema: Schema = new Schema({

    projectName: { type: String, required: true },

    
  
  
});

export default model("Project", projectSchema);
