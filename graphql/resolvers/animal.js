const Animal = require("../../model/animal");

const animalResolvers = {
    Query:{
        animals:async()=>{
            try {
                const resp = await Animal.findAll();
                console.log("resp",resp);
                return resp
            } catch (error) {
                console.log("error",error);
            }
        }
    },
    Mutation:{
        addAnimal:async(_,payload)=>{
            try {
                const resp = await Animal.create(payload);
                return resp
            } catch (error) {
                console.log("error",error);
            }
        }
    }
}

module.exports = animalResolvers