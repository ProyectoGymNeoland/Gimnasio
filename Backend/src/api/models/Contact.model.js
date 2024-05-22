const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            trim: true,
            validate: [validator.isEmail, "Email not valid"], 
        },
        name: {
            type: String,
            required: true,
            trim: true,
         },
        telephone:{
            type: Number,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
    },
    },
    {
    timestamps: true,
    }
);

const Contact = mongoose.model("Contact",ContactSchema);
module.exports = Contact;