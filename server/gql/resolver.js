const userController = require("../controllers/user");
//const {GraphQLUpload} = require("graphql-upload");
//const { finished } = require("stream/promises");


export const resolvers = {
    //Upload: GraphQLUpload,
    Query: {
        // User
        getUser: (_, { id, username }) => userController.getUser(id, username),
    },
    Mutation: {
        // User
        register: (_, { input }) => userController.register(input),
        login: (_, { input }) => userController.login(input),
        updateAvatar: (_, { file }) => userController.updateAvatar(file),
        // updateAvatar: async (parent, { file }) => {
        //     const { createReadStream, filename, mimetype, encoding } =
        //         await file;
        //     const stream = createReadStream();
        //     const out = require("fs").createWriteStream(
        //         "local-file-output.txt"
        //     );
        //     stream.pipe(out);
        //     await finished(out);

        //     return { filename, mimetype, encoding };
        // },
    },
};
