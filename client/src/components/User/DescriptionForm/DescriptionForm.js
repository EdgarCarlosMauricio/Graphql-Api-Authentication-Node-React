import './DescriptionForm.scss';

import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Button, Form, TextArea } from 'semantic-ui-react';
import * as Yup from 'yup';

import { UPDATE_USER } from '../../../gql/user';

export default function DescriptionForm(props) {
    const { setShowModal, currentDescription, refetch } = props;

    const [updateUser] = useMutation(UPDATE_USER);

      const formik = useFormik({
          initialValues: { description: currentDescription || "" },
          validationSchema: Yup.object({
              description: Yup.string().required(),
          }),
          onSubmit: async (formValue) => {
              try {
                  const result = await updateUser({
                      variables: {
                          input: {
                              description: formValue.description,
                          },
                      },
                  });
                  if (!result.data.updateUser) {
                      toast.error("Error al cambiar la biografia");
                  }
                  toast("Biografia actualizada");
                  // opcion de volver a recargar la pagina para cargar el dato cambiado
                  refetch();
                  // cierra el modal
                  setShowModal(false);
              } catch (error) {
                  toast.error("Error al cambiar la biografia");
              }
          },
      });
    
    function cancel() {
        setShowModal(false);
    }
    return (
        <Form className="description-form" onSubmit={formik.handleSubmit}>
            <TextArea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className={formik.errors.description && "error"}
            ></TextArea>
          
                <Button type="submit" className="btn-submit">
                    Actualizar
                </Button>
                <Button onClick={cancel} className="btn-submit">
                    Cancelar
                </Button>
            
        </Form>
    );
} 
