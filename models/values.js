const { Schema, model } = require('mongoose');

const ValuesSchema = Schema({

    nombre: {
        type: String
    },
    adulto: {
        type: String
    },
    adultoMayor: {
        type: String
    },
    estudiante: {
        type: String
    },
    estudianteUni: {
        type: String
    },
    intermedio: {
        type: String
    },
    local: {
        type: String
    },
});

ValuesSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model('Values', ValuesSchema );