const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Patient {
	    id: ID,
	    age: Int,
	    gender: String,
	    microbe: Microbe,
	    antimicrobe: [Antimicrobe]
    }
    type Antimicrobe {
        id: String,
        microbe: Microbe,
        relation: String 
    }
    type Microbe {
        microbe: String,
        antimicrobe: [Antimicrobe],
        ward {
            icu: Int,
            clinical: Int
        },
        patient: [Patient]
    }
    type Mutation {
        addPatient (id: ID,
            age: Int,
            gender: String,
            microbe: Microbe,
            antimicrobe: [Antimicrobe]): Mutation,
        addMicrobe (microbe: String,
            antimicrobe: [Antimicrobe],
            ward {
                icu: Int,
                clinical: Int
            },
            patient: [Patient]): Microbe,
        addAntimicrobe (id: String,
            microbe: Microbe,
            relation: String ): Antimicrobe
    }
`

module.exports = typeDefs