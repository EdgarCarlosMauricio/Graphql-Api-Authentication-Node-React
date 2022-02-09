import './SiteWebForm.scss';

import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';

import { UPDATE_USER } from '../../../gql/user';

export default function SiteWebForm(props) {
    const { setShowModal, currentSiteWeb, refetch } = props;
    
    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: { siteWeb: currentSiteWeb || "" },
        validationSchema: Yup.object({
            siteWeb: Yup.string().required(),
        }),
        onSubmit: async (formValue) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            siteWeb: formValue.siteWeb,
                        },
                    },
                });
                if (!result.data.updateUser) {
                    toast.error("Error al cambiar el siteWeb");
                }
                toast("SiteWeb Actualizado");
                // opcion de volver a recargar la pagina para cargar el dato cambiado
                refetch();
                // cierra el modal
                setShowModal(false);
            } catch (error) {
                toast.error("Error al cambiar el siteWeb");
            }
        },
    });

    function cancel() {
        setShowModal(false);
    }
    


    return (
        <Form className="site-web-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                placeholder="Escribe tu nuevo siteWeb"
                name="siteWeb"
                value={formik.values.siteWeb}
                onChange={formik.handleChange}
                error={formik.errors.siteWeb && true}
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
