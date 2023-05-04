const mongoose = require('mongoose')
const { Schema } = mongoose

const AntimicrobeSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    microbe:{
        type: MicrobeSchema,
        required: true
    },
    relation:{
        type: String,
    }
})


const PatientSchema = new Schema({
    id:{
        type: Schema.Types.ObjectId,
        required: true
    },
    age:{
        type: Int,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    microbe:{
        type: MicrobeSchema,
        required: true
    },
    antimicrobe:{
        type: [AntimicrobeSchema],
        required: true

    }
})

const MicrobeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    antimicrobe:{
        type: [AntimicrobeSchema],
        required: true

    },
    ward:{
            icu:{
                type: Int
            },
            clinical:{
                type: Int
            } 
    },
    patient:{
        type: [PatientSchema],
        required: true
    }

})

const Microbe = mongoose.model('Microbe', MicrobeSchema)
const Antimicrobe = mongoose.model('Antimicrobe', AntimicrobeSchema)
const Patient = mongoose.model('Patient', PatientSchema)

module.exports = {
    Microbe,
    Antimicrobe,
    Patient
}