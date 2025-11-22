const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize");
const Planet = require("./model/planet");
const { planetRouter } = require("./routes/planet");
const server = express();
const Redis = require("ioredis");
const redis = new Redis();

server.use(cors())
server.use(express.json())
const port = 3000
server.use("/planets",planetRouter)

server.get("/planets",async(req,res)=>{     //checking connection
    res.status(200).send("Hello World!")
});

server.listen(port,async()=>{
    try {
        redis.on("connect",()=>console.log("Redis is connected"));  //brew services start redis
        await sequelize.authenticate();
        await sequelize.sync();
        console.log(`Sequelize conected`);
        console.log(`Server is running on ${port}`);
    } catch (error) {
       console.log("error",error);
    }
})

// -----------------------GraphQL-----------------

// const cors = require("cors");
// const express = require("express");
// const { ApolloServer } = require("@apollo/server");
// const { startStandaloneServer } = require("@apollo/server/standalone");
// const sequelize = require("./sequelize");
// const animalDefs = require("./graphql/schema/animal");
// const animalResolvers = require("./graphql/resolvers/animal");
// const server = express();

// server.use(cors());
// server.use(express.json());

// async function startServer() {
//     //connecting Apollo server
//   const apolloServer = new ApolloServer({ typeDefs:animalDefs, resolvers:animalResolvers });
//     //connectong DB
//   await sequelize.authenticate();
//   await sequelize.sync();

//   console.log("Sequelize connected successfully");
  
//   const { url } = await startStandaloneServer(apolloServer, {
//     listen: {
//       port: 4000,
//     },
//   });
//   console.log("Server is running on ",url);
// }

// startServer();
