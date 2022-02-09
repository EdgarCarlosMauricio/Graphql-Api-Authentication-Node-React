import './LoginForm.scss';

import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';

import { LOGIN } from '../../../gql/user';
import useAuth from '../../../hooks/useAuth';
import { decodeToken, setToken } from '../../../utils/token';



export default function LoginForm() {

    const [error, setError] = useState("");
    const [login] = useMutation(LOGIN);
    const { setUser } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria"),
        }),
        onSubmit: async (formData) => {
            setError("");
            try {
                const { data } = await login({
                    variables: {
                        input: formData
                    },
                });
                const { token } = data.login;
                setToken(token);
                setUser(decodeToken(token));
            } catch (error) {
                setError(error.message);
            }
        }
    });


    return (
        <>
            <h2 className='login-form-title'>Entra Para Ver Fotos Y Videos De Tus Amigos</h2>
            <Form className='login-form' onSubmit={formik.handleSubmit}>
                <Form.Input type="text" placeholder="Correo electronico" name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email && true} />
                <Form.Input type="password" placeholder="Contraseña" name="password" value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password && true} />
                <Button type="submit" className='btn-submit'>Iniciar sesion</Button>
                {error && <p className='submit-error'>{ error }</p>}
            </Form>
        </>
    );
}

function initialValues() {
    return {
        email: "",
        password: ""
    };
}

