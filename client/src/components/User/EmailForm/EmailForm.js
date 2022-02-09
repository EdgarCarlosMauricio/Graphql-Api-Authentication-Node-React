import './EmailForm.scss';

import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';

import { UPDATE_USER } from '../../../gql/user';

export default function EmailForm(props) {
    const { setShowModal, currentEmail, refetch } = props;

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {email: currentEmail || "",},
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
        }),
        onSubmit: async (formValue) => { 
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            email: formValue.email,
                        }
                    }
                });
                if (!result.data.updateUser) {
                    toast.error("Error al cambiar el email");
                }
                toast("Email Actualizado");
                // opcion de volver a recargar la pagina para cargar el dato cambiado
                refetch();
                // cierra el modal
                setShowModal(false);
            } catch (error) {
                toast.error("Error al cambiar el email");
            }
        }
    });


    function cancel() {
         setShowModal(false);
    }
    
    
    return (
        <Form className="email-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                placeholder="Escribe tu nuevo email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email && true}
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



