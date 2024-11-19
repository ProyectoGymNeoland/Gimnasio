const mongoose = require("mongoose");
const validator = require("validator");
const validateSpanishMobile = require("../../utils/validateMobile");

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
            type: String,
            required: true,
            trim: true,
           validate: {
                validator: validateSpanishMobile,
                message: "Telephone number not valid",
            },
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