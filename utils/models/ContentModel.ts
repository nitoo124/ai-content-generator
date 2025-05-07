import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";


const ContentSchema = new mongoose.Schema({
  formData: {
    type: Object,
    required: true
  },
  aiOutput: {
    type: String,
    required: true
  },
  templateSlug: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  email:{
    type:String,
    required:true,
    unique:true
  }
});

const Content =mongoose.models.Content|| mongoose.model("Content",ContentSchema)
export default Content