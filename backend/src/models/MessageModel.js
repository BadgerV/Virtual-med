import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
    {
        sender : {
            type : mongoose.Schema.Types.ObjectId,
            refPath : "senderModel"
        },
        senderModel : {
            type : String,
            enum : ['User', 'Staff']
        },
        content : {
            type : String,
            trim : true
        },
        chat : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Chat"
        }
    }, {
        timeStamps : true
    }
);

export const Message = mongoose.model("Message", MessageSchema);