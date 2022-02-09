import './PasswordForm.scss';

import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';

import { UPDATE_USER } from '../../../gql/user';

export default function PasswordForm(props) {
    const { onLogout, setShowModal } = props;
    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string()
                .required()
                .oneOf([Yup.ref("repeatNewPassword")]),
            repeatNewPassword: Yup.string()
                .required()
                .oneOf([Yup.ref("newPassword")]),
        }),
        // como useMutation devuelve una promesa hacemos la funcion async
        onSubmit: async(formValues) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            currentPassword: formValues.currentPassword,
                            newPassword: formValues.newPassword,
                        }
                    }
                });
                if (!result.data.updateUser) {
                    toast.error("Error al cambiar la contraseña");
                } else {
                    // Si la cambia se sale de la session y muestra toast al usuario
                    toast("Contraseña Actualizada");
                    onLogout();
                }
            } catch (error) {
                toast.error("Error al cambiar la contraseña");
            }
            
        },
    });

     function cancel() {
         setShowModal(false);
     }

    return (
        <Form className="password-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                type="password"
                placeholder="Contraseña actual"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={formik.errors.currentPassword}
            ></Form.Input>
            <Form.Input
                type="password"
                placeholder="Nueva contraseña"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.errors.newPassword}
            ></Form.Input>
            <Form.Input
                type="password"
                placeholder="Repetir nueva contraseña"
                name="repeatNewPassword"
                value={formik.values.repeatNewPassword}
                onChange={formik.handleChange}
                error={formik.errors.repeatNewPassword}
            ></Form.Input>
            <Button type="submit" className="btn-submit">
                Actualizar
            </Button>
            <Button onClick={cancel} className="btn-submit">
                Cancelar
            </Button>
        </Form>
    );
}



function initialValues() { 
    return {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    }
}