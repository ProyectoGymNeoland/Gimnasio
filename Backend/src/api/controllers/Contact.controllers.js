const Contact = require("../models/Contact.model");


const createContact = async (req,res,next)=>{
    try {
        await Contact.syncIndexes();
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();

        return res
      .status(savedContact ? 200 : 404)
      .json(savedContact? savedContact : "error al crear el mensaje de contacto");
    } catch (error) {
       return res.status(404).json({
      error: "error catch create contact",
      message: error.message,
    }); 
    }
}

const deleteContact = async (req,res,next)=>{
    try {
        const {id}=req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);
        
        // Si no encontramos el contacto a eliminar, devuelve un 404
        if (!deletedContact) {
            return res.status(404).json("Contact not found (is already deleted or does it really exist?) ");
        }
        
        return res.status(200).json("Deleted successfully");
        
    } catch (error) {
        return res.status(404).json(error.message);
    }
}

const getContactsAll = async (req, res, next) => {
  try {
    const getAllContact = await Contact.find(); // esto devuelve un array
    if (getContactsAll.length === 0) {
      return res.status(404).json("no encontrados");
    } else return res.status(200).json({ data: getAllContact });
  } catch (error) {
    return next(error);
  }
};

module.exports = {createContact,deleteContact,getContactsAll};

/* 
*/ 