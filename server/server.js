require('dotenv/config');
const mongoose = require("mongoose");
const {graphqlUploadExpress} = require("graphql-upload");

const app = require("./app");
const apolloServer = require("./apollo");

async function startServer() {
    app.use(graphqlUploadExpress());
    await apolloServer.start();
    apolloServer.applyMiddleware({app});
    app.use('/', (req, res) => {
        res.send("Bienvenido a Ubuntu Force Api Graphql!")
    })
};

startServer(); 

mongoose
    .connect(process.env.MONGODB_LOCAL_URL)
    .then(() => console.log("Conexion Correcta A La BD!"))
    .catch((err) => console.log("Error De Conexion BD:!"));

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`App esta corriendo en el puerto ${port}`);
    console.log(`Graphql EndPoint Path: ${apolloServer.graphqlPath}`);
})