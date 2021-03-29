import mongoose from "mongoose"

const whatsappSchema = new mongoose.Schema({
    message : String,
    name : String,
    time : String,
    received : Boolean
})

export default mongoose.model("messagecontents",whatsappSchema)