const { Patient,Antimicrobe,Microbe } = require('./models')
const pubsub = require('./pubsub')

const resolvers = {
    Query: {
        patients (parent, args, context, info) {
            return Patient.find()
                .then (patient => {
                    return patient.map (r => ({ ...r._doc }))
                })
                .catch (err => {
                    console.error(err)
                })
        },
        patient (parent, args, context, info) {
            return Patient.findOne({ _id: args.id })
                .then (patient => {
                    return { ...patient._doc }
                })
                .catch (err => {
                    console.error(err)
                })
        },
        microbes (parent, args, context, info) {
            return Microbe.find()
                .then (microbe => {
                    return microbe.map (r => ({ ...r._doc }))
                })
                .catch (err => {
                    console.error(err)
                })
        },
        microbe (parent, args, context, info) {
            return Microbe.findOne({ _id: args.id })
                .then (microbe => {
                    return { ...microbe._doc }
                })
                .catch (err => {
                    console.error(err)
                })
        },
        antimicrobes (parent, args, context, info) {
            return Antimicrobe.find()
                .then ( antimicrobe => {
                    return  antimicrobe.map (o => ({ ...o._doc }))
                })
                .catch (err => {
                    console.error(err)
                })
        },
        antimicrobe (parent, args, context, info) {
            return  Antimicrobe.findOne({ _id: args.id })
                .then ( antimicrobe => {
                    return { ... antimicrobe._doc }
                })
                .catch (err => {
                    console.error(err)
                })
        }
    },
    Mutation: {
        addAntimicrobe (parent, args, context, info) {
            const { id, microbe, relation } = args
            const antimicrobeObj = new Antimicrobe({
                id,
                microbe,
                relation
            })
            return antimicrobeObj.save()
                .then (result => {
                    return { ...result._doc }
                })
                .catch (err => {
                    console.error(err)
                })
        },
        addPatient (parent, args, context, info) {
            const { id, age, gender, microbe, antimicrobe } = args
            const patientObj = new Patient({
                id, age, gender, microbe, antimicrobe
            })
            return patientObj.save()
                .then (result => {
                    return { ...result._doc }
                })
                .catch (err => {
                    console.error(err)
                })
        },
        addMicrobe (parent, args, context, info) {
            const { microbe, antimicrobe, ward, patient } = args
            const microbeObj = new Microbe({
                microbe, antimicrobe, ward, patient
            })
            return microbeObj.save()
            .then (result => {
                return { ...result._doc }
            })
            .catch (err => {
                console.error(err)
            })
        }
    }
}

module.exports = resolvers