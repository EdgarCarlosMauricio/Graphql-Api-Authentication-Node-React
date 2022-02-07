import './SettingsForm.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import client from '../../../config/apollo';
import useAuth from '../../../hooks/useAuth';
import PasswordForm from '../PasswordForm/PasswordForm';

export default function SettingsForm(props) {
  const { setShowModal, setTitleModal, setChildrenModal } = props;
  const { logout } = useAuth();
  let navigate = useNavigate();

  const onChangePassword = () => { 
    setTitleModal("Cambiar Tu Contraseña");
    setChildrenModal(<PasswordForm />);
  }

  const onLogout = () => {
    // limpia la cache de apollo client
    client.clearStore();
    // se sale borrando el localstorage
    logout();
    // redirecciona a la home
    navigate("/");
  }

   return (
       <div className="settings-form">
           <Button onClick={onChangePassword}>Cambiar contraseña</Button>
           <Button>Cambiar email</Button>
           <Button>Cambiar descripcion</Button>
           <Button>Cambiar Sitio web</Button>
           <Button onClick={onLogout}>Cerrar sesion</Button>
           <Button onClick={() => setShowModal(false)}>Cancelar</Button>
       </div>
   );
}
