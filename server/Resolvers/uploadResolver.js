const { readFile, multipleReadFile } = require("../Middlewares/file");
const { SingleFile } = require("../Model/singleUploadModel");
const { MultipleFile } = require("../Model/multipleUpload");
const { User } = require("../Model/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { parse, join } = require("path");
const { awsUploadImage, awsDeleteS3 } = require("../utils/aws-upload-image");
const { nanoid } = require("nanoid");



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
            return "Bienvenido";
        },
        search: async (_, { search }) => {
            const users = await User.find({
                name: { $regex: search, $options: "i"}
            });
            return users;
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
                // token: createToken(userFound, process.env.SECRET_KEY, "1h"),
                // token: createToken(userFound, process.env.SECRET_KEY, "20d"),
                // token: createToken(userFound, process.env.SECRET_KEY, "120"), ms
                token: createToken(userFound, process.env.SECRET_KEY, "1d"),
            };
        },
        // updateAvatar: (_, { file }) => userController.updateAvatar(file),
        updateAvatar: async (_, { file }, context) => {
            // sacamos la id del usuario del contexto extraido del token en apollo.js
            //enviado desde el front
            const { id } = context.user;
            // con el id buscamos la urlAvatar en la bd para borrar la actual antes de subir la nueva
            const userX = await User.findById(id);
            // borramos el avatar actual
            if (userX.avatar) {
                try {
                    const deleteActual = await awsDeleteS3(userX.avatar);
                    // console.log("Borrado avaatr anterior: ", deleteActual);
                } catch (error) {
                    console.log(error);
                }
            }
            const { createReadStream, filename } = await file;
            // sacamos la extencion del archivo
            var { ext, name } = parse(filename);
            // avatar es el nombre de la carpeta en S3
            const uuidNew = nanoid();
            const imageName = `avatar/${id}-${name}-${uuidNew}${ext}`;
            // cada vez que se cambie el avatar sobreescribira el que esta.
            const fileData = createReadStream();
            try {
                // Opcion de guardar en el servidor los archivos con las siguientes dos lineas
                // const imageUrl = await readFile(file);
                // const singlefile = new SingleFile({ image: imageUrl });

                const result = await awsUploadImage(fileData, imageName);
                // guardamos el link del avatar subido en la BD
                await User.findByIdAndUpdate(id, { avatar: result });
                // Retornamos status y la url del avatar
                return {
                    status: true,
                    urlAvatar: result,
                };
            } catch (error) {
                return {
                    status: false,
                    urlAvatar: null,
                };
            }
        },
        // los datos del avatar a borrar llegan por el contexto
        deleteAvatar: async (_, {}, context) => {
            // sacamos el id del contexto
            // el contexto llega por los headers y se configura en el archivo apollo.js
            const { id } = context.user;
            // con el id buscamos la urlAvatar en la bd para borrar la actual antes de subir la nueva
            const userX = await User.findById(id);
            // borramos el avatar actual
            if (userX.avatar) {
                try {
                    const deleteActual = await awsDeleteS3(userX.avatar);
                    // console.log("Borrado de avatar anterior: ", deleteActual);
                } catch (error) {
                    console.log(error);
                }
            }
            // reseteamos a "" la urlAvatar
            try {
                await User.findByIdAndUpdate(id, { avatar: "" });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },

        updateUser: async (_, { input }, context) => {
            // sacamos el id del contexto
            // el contexto llega por los headers y se configura en el archivo apollo.js
            const { id } = context.user;

            try {
                if (input.currentPassword && input.newPassword) {
                    // Traemos la contraseña guardada, y comparamos con la contraseña enviada
                    const userFound = await User.findById(id);
                    const passwordSucess = await bcryptjs.compare(
                        input.currentPassword,
                        userFound.password
                    );
                    if (!passwordSucess)
                        throw new Error("Contraseña Incorrecta");

                    const salt = await bcryptjs.genSaltSync(10);
                    const newPaswordCrypt = await bcryptjs.hash(
                        input.newPassword,
                        salt
                    );

                    await User.findByIdAndUpdate(id, {
                        password: newPaswordCrypt,
                    });
                } else {
                    await User.findByIdAndUpdate(id, input);
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
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