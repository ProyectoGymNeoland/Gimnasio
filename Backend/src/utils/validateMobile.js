const { parsePhoneNumberFromString } = require('libphonenumber-js');


 const validateSpanishMobile = (value) => {
    if (typeof value !== 'string') {
        throw new Error('El número de teléfono proporcionado debe ser una cadena.');
    }
    const phoneNumber = parsePhoneNumberFromString(value, 'ES');
    if (!value.startsWith('+34')) {
        throw new Error('El número de teléfono proporcionado debe incluir el prefijo internacional para España (+34).');
    }
    if (!phoneNumber) {
        throw new Error('El número de teléfono proporcionado no es válido.');
    }
    if (!phoneNumber.isValid()) {
        throw new Error('El número de teléfono proporcionado no es un número válido.');
    }
    return true;
};
module.exports = validateSpanishMobile;