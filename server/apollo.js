const {ApolloServer} = require("apollo-server-express");
const typeDefs = require("./TypeDefs/main");
const resolvers = require("./Resolvers/main");
const jwt = require("jsonwebtoken");


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: (headers) => { 
        const { req } = headers;
        const token = req.headers.authorization;
        if (token) { 
            try {
                const user = jwt.verify(
                    token.replace("Bearer ", ""),
                    process.env.SECRET_KEY
                );
                return {
                    user,
                }
            } catch (error) {
                console.log("#### ERROR ####");
                if (error.name === "TokenExpiredError") {
                    console.log("Token Expiro");
                    throw new Error("Token Invalido"); 
                } else {
                    console.log(error);
                    throw new Error("Token Invalido"); 
                }
                
                
            }
        }
    }
});

module.exports = apolloServer;