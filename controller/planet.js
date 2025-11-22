// const Planet = require("../model/planet");
// const Redis = require("ioredis");
// const redis = new Redis();

// exports.getAllPlanets = async(req,res)=>{
//     const url = req.baseUrl;
//     console.log("url----",url);
//     try {
//         const chachedData = await redis.get(url);
//         if(chachedData){
//             res.status(200).send(resp)
//             return
//         }
//         const resp = await Planet.findAll({attributes:{
//             exclude:["createdAt","updatedAt"]
//         }});
//         await redis.set(url, JSON.stringify(resp));
//         res.status(200).send(resp)
//     } catch (error) {
//         console.log("error",error);
//         res.status(400).send(error)
//     }
// };

// exports.addNewPlanet = async(req,res)=>{
//     const payload = req.body
//     const url = req.baseUrl;
//     try {
//         // ❗IMPORTANT: Clear cache after creating/updating/deleting data
//         await redis.del(url);
//         const resp = await Planet.create(payload);
//         res.status(200).send(resp)
//     } catch (error) {
//         console.log("error",error);
//         res.status(400).send(error)
//     }
// }

// exports.updateNewPlanet = async(req,res)=>{
//     const {id} = req.params;
//     const payload = req.body
//     try {
//         const resp = await Planet.update(payload,{
//             where:{
//                 id:id
//             }
//         });
//         res.status(200).send(resp)
//     } catch (error) {
//         console.log("error",error);
//         res.status(400).send(error)
//     }
// }

// exports.deletePlanet = async(req,res)=>{
//     const {id} = req.params;
//     try {
//         const resp = await Planet.destroy({
//             where:{
//                 id:id
//             }
//         });
//         res.status(200).send(resp)
//     } catch (error) {
//         console.log("error",error);
//         res.status(400).send(error)
//     }
// }

const sequelize = require("../sequelize");
exports.getAllPlanets = async (req, res) => {
  try {
    const [result] = await sequelize.query(
      "EXEC sp_PlanetOperations @Mode = :mode",
      {
        replacements: { mode: 1 }, // GET
      }
    );
    res.status(200).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
};

exports.addNewPlanet = async (req, res) => {
  const { name, price } = req.body;
  try {
    const [result] = await sequelize.query(
      `EXEC sp_PlanetOperations 
            @Mode = :mode,
            @name = :name,
            @price = :price`,
      {
        replacements: {
          mode: 2, // POST
          name,
          price,
        },
      }
    );
    res.status(200).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
};


// CREATE PROCEDURE sp_PlanetOperations
// (
//     @Mode  INT,                  -- 1 = GET, 2 = POST
//     @id    INT = NULL,           -- Not used now but kept for future use
//     @name  VARCHAR(100) = NULL,  -- POST input
//     @price INT = NULL            -- POST input
// )
// AS
// BEGIN
//     IF (@Mode = 1)
//     BEGIN
//         SELECT 
//             id,
//             name,
//             price
//         FROM planets;

//         RETURN;
//     END

//     IF (@Mode = 2)
//     BEGIN
//         INSERT INTO planets (name, price,createdAt, updatedAt)
//         VALUES (@name, @price,GETDATE(), GETDATE());
//         SELECT 
//             id,
//             name,
//             price
//         FROM planets
//         WHERE id = SCOPE_IDENTITY();
//         RETURN;
//     END
// END;
