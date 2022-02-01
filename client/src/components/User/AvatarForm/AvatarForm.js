// import './AvatarForm.scss';
import './AvatarForm.scss';

import { useMutation } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';

import { DELETE_AVATAR, GET_USER, UPDATE_AVATAR } from '../../../gql/user';


export default function AvatarForm(props) {
    const { setShowModal, auth } = props;
    const [loading, setLoading] = useState(false);

    const [updateAvatar] = useMutation(UPDATE_AVATAR, {
        // añadimos la variable update a la peticion
        update(cache, { data: { updateAvatar } }) { 
            // hacemos una peticion a la cache de apollo  extraemos la query
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username },
            });
            // indicamos que query queremos actualizar 
            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username },
                // y le mandamos los nuevos datos
                data: {
                    getUser: { ...getUser, avatar: updateAvatar.urlAvatar },
                },
            });
        },
    });

    

    // usado para abrir explorador de archivos
    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];

        try {
            setLoading(true);
            const result = await updateAvatar({ variables: { file } });
            const { data } = result;

            if (!data.updateAvatar.status) {
                toast.warning("Error al actualizar el avatar");
                setLoading(false);
            } else { 
                setLoading(false);
                setShowModal(false);
            }
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }, []);

    // usado para abrir explorador de archivos
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop,
    });


    // eliminando avatar
    const [deleteAvatar] = useMutation(DELETE_AVATAR, {
        update(cache, { data: { deleteAvatar } }) {
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username },
            });

            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username },
                data: {
                    getUser: { ...getUser, avatar: "" }
                },
            });
        },
    });
    
    const onDeleteAvatar = async() => {
        try {
            const result = await deleteAvatar();
            const { data } = result;

            if (!data.deleteAvatar) {
                toast.warning("Error al borrar el avatar");
            } else { 
                setShowModal(false);
            }
        } catch (error) {
            console.log(error);           
        }
    }




    return (
        <div className="avatar-form">
            <Button {...getRootProps()} loading={ loading }>
                {isDragActive ? "pepe" : "Cargar una foto"}
            </Button>
            <Button onClick={ onDeleteAvatar }>Eliminar una foto</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            <input {...getInputProps()} />
        </div>
    );
}
