import { resolvers } from '../gql/resolver';
import { typeDefs } from '../gql/schema';

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
require("dotenv").config({ path: ".env" });
const app = express();

//const { graphqlUploadExpress } = require("graphql-upload");


//app.use(graphqlUploadExpress());


mongoose.connect(process.env.BBDD, { useNewUrlParser: true, useUnifiedTopology: true, },
    (err, _) => {
        if (err) {console.log("Error De Conexion BD: ", err);
        } else {console.log("Conexion Correcta A La BD");}
    }
);

let serverApollo = null;
async function startServer() {
    serverApollo = new ApolloServer({ typeDefs, resolvers });
    await serverApollo.start();
    serverApollo.applyMiddleware({ app });
}

startServer();
app.get('/', (req, res) => {
    console.log("Apollo GraphQL Express server is ready");
});
app.listen({ port: process.env.PORT }, () => {
    console.log(
        `Server is running at http://localhost:${process.env.PORT}${serverApollo.graphqlPath}`
    );
});
