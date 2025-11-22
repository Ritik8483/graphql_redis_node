const { gql } = require("graphql-tag");

const animalDefs = gql`
    type Animal{
        id:ID!,
        name:String!,
        price:Int!
    }

    type Query{
        animals:[Animal]
    }

    type Mutation{
    addAnimal(name:String!,price:Int!):Animal
    }
`

module.exports = animalDefs