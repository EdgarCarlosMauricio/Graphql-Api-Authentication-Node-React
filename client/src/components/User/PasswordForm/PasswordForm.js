import './PasswordForm.scss';

import { useFormik } from 'formik';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';

export default function PasswordForm() {
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
        onSubmit: (formValue) => {
            console.log("formulario enviado");
            console.log(formValue);
        },
    });

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