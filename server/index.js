const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");
require("dotenv").config({ path: ".env" });



// console.log(process.env.BBDD);
mongoose.connect(
    process.env.BBDD,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, _) => {
        if (err) {
            console.log("Error De Conexion BD: ", err);
        } else {
            console.log("Conexion Correcta A La BD");
            server();
        }
    }
);


function server() { 
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers,

    });

    serverApollo.listen().then((response) => { 
        console.log("Servidor On ", response.url);
    })
}