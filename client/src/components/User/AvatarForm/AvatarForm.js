// import './AvatarForm.scss';
import './AvatarForm.scss';

import { useMutation } from '@apollo/client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'semantic-ui-react';

import { UPDATE_AVATAR } from '../../../gql/user';


// import { useMutation } from '@apollo/client';
// import React, { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { Button } from 'semantic-ui-react';

// import { UPDATE_AVATAR } from '../../../gql/user';

// export default function AvatarForm(props) {
//     const { setShowModal } = props;

//     const [updateAvatar] = useMutation(UPDATE_AVATAR);

    
//     // usado para abrir explorador de archivos
//     const onDrop = useCallback(async (acceptedFile) => {
//         const file = acceptedFile[0];

//         try {
//             //setLoading(true);
//             const result = await updateAvatar({ variables: { file } });
//             //const { data } = result;

//             // if (!data.updateAvatar.status) {
//             //     toast.warning("Error al actualizar el avatar");
//             //     setLoading(false);
//             // } else {
//             //     setLoading(false);
//             //     setShowModal(false);
//             // }
//         } catch (error) {
//             console.log(error);
//         }
//     }, []);

//     // usado para abrir explorador de archivos
//       const { getRootProps, getInputProps } = useDropzone({
//           accept: "image/jpeg, image/png",
//           noKeyboard: true,
//           multiple: false,
//           onDrop,
//       });

//     return (
//         <div className="avatar-form">
//             <Button {...getRootProps()}>Cargar una foto</Button>
//             <Button>Eliminar una foto</Button>
//             <Button onClick={() => setShowModal(false)}>Cancelar</Button>
//             <input {...getInputProps()} />
//         </div>
//     );
// }


export default function AvatarForm(props) {
    const { setShowModal } = props;
    const [updateAvatar] = useMutation(UPDATE_AVATAR);

    // usado para abrir explorador de archivos
    const onDrop = useCallback(
        (acceptedFile) => {
            const file = acceptedFile[0];
            console.log(file);
            updateAvatar({
                variables: { file },
                onCompleted: () => {},
            });
        },
        [updateAvatar]
    );

    // usado para abrir explorador de archivos
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop,
    });

    return (
        <div className="avatar-form">
            <Button {...getRootProps()}>
                {isDragActive ? "pepe" : "Cargar una foto"}
            </Button>
            <Button>Eliminar una foto</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            <input {...getInputProps()} />
        </div>
    );
}
