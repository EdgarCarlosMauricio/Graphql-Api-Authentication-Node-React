const { readFile, multipleReadFile } = require("../Middlewares/file");
const { SingleFile } = require("../Model/singleUploadModel");
const { MultipleFile } = require("../Model/multipleUpload");
const { User } = require("../Model/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { parse, join } = require("path");
const awsUploadImage = require("../utils/aws-upload-image");
// const userController = require("../controllers/user");


function createToken(user, SECRET_KEY, expiresIn) {
    const { id, name, email, username } = user;
    const payload = {
        id,
        name,
        email,
        username,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

module.exports = {
    Query: {
        // getUser: (_, { id, username }) => userController.getUser(id, username),
        getUser: async (_, { id, username }) => {
            let user = null;
            if (id) user = await User.findById(id);
            if (username) user = await User.findOne({ username });
            if (!user) throw new Error("El usuario no existe");

            return user;
        },
        greetings: () => {
            return "Hola Mundo";
        },
    },
    Mutation: {
        // register: (_, { input }) => userController.register(input),
        register: async (_, { input }) => {
            const newUser = input;
            // Convertimos a minusculas el email y username
            newUser.email = newUser.email.toLowerCase();
            newUser.username = newUser.username.toLowerCase();
            const { email, username, password } = newUser;
            // Revisamos si el email esta en uso
            const foundEmail = await User.findOne({ email });
            if (foundEmail) throw new Error("El email ya existe");
            // Revisamos si el username esta en uso
            const foundUserName = await User.findOne({ username });
            if (foundUserName) throw new Error("El usermail ya existe");
            // Encriptar
            const salt = await bcryptjs.genSaltSync(10);
            newUser.password = await bcryptjs.hash(password, salt);
            try {
                const user = new User(newUser);
                user.save();
                return user;
            } catch (error) {
                console.log(error);
            }
        },
        // login: (_, { input }) => userController.login(input),
        login: async (_, { input }) => {
            const { email, password } = input;
            const userFound = await User.findOne({
                email: email.toLowerCase(),
            });
            if (!userFound) throw new Error("Error en el email o contraseña");
            const passwordSucess = await bcryptjs.compare(
                password,
                userFound.password
            );
            if (!passwordSucess)
                throw new Error("Error en el email o contraseña");
            return {
                token: createToken(userFound, process.env.SECRET_KEY, "6h"),
            };
        },
        // updateAvatar: (_, { file }) => userController.updateAvatar(file),
        updateAvatar: async (_, { file }) => {
            const { createReadStream, filename } = await file;
            var { ext, name } = parse(filename);
            const imageName = `avatar/avt${ext}`;
            const fileData = createReadStream();
            try {
                const result = await awsUploadImage(fileData, imageName);
                console.log(result);
            } catch (error) {
                return {
                    status: false,
                    urlAvatar: null
                }
            }
            //const imageUrl = await readFile(file);
            // const singlefile = new SingleFile({ image: imageUrl });
            //const user = new User({ avatar: imageUrl });
            // await User.findByIdAndUpdate(id, { avatar: "" });
            // return true;
        },
        singleUpload: async (_, { file }) => {
            const imageUrl = await readFile(file);
            const singlefile = new SingleFile({ image: imageUrl });
            await singlefile.save();
            return {
                message: "Subida de archivo OK!",
            };
        },
        multipleUpload: async (_, { file }) => {
            const imageUrl = await multipleReadFile(file);
            const multiplefile = new MultipleFile();
            multiplefile.images.push(...imageUrl);
            multiplefile.save();
            return {
                message: "Subida de multiples archivos OK!",
            };
        },
    },
};