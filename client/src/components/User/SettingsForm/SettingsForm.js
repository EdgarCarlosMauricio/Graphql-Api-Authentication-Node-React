import './SettingsForm.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import client from '../../../config/apollo';
import useAuth from '../../../hooks/useAuth';
import DescriptionForm from '../DescriptionForm/DescriptionForm';
import EmailForm from '../EmailForm/EmailForm';
import PasswordForm from '../PasswordForm/PasswordForm';
import SiteWebForm from '../SiteWebForm/SiteWebForm';

export default function SettingsForm(props) {
  const { setShowModal, setTitleModal, setChildrenModal, getUser, refetch } =
      props;
  const { logout } = useAuth();
  let navigate = useNavigate();

  const onChangePassword = () => { 
    setTitleModal("Cambiar Tu Contraseña");
    setChildrenModal(
      <PasswordForm
        onLogout={onLogout}
        setShowModal={setShowModal} />
    );
  }
  const onChangeEmail = () => { 
    setTitleModal("Cambiar Email");
    setChildrenModal(
        <EmailForm
            setShowModal={setShowModal}
            currentEmail={getUser.email}
            refetch={refetch}
        />
    );
  }
  const onChangeDescription = () => { 
    setTitleModal("Actualizar Tu Biografia");
    setChildrenModal(
        <DescriptionForm
            setShowModal={setShowModal}
            currentDescription={getUser.description}
            refetch={refetch}
        />
    );
  }
  
  const onChangeSiteWeb = () => {
      setTitleModal("Actualizar Tu Sitio Web");
      setChildrenModal(
          <SiteWebForm
              setShowModal={setShowModal}
              currentSiteWeb={getUser.siteWeb}
              refetch={refetch}
          />
      );
  };

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
           <Button onClick={onChangeEmail}>Cambiar email</Button>
           <Button onClick={onChangeDescription}>Cambiar descripcion</Button>
           <Button onClick={onChangeSiteWeb}>Cambiar sitio web</Button>
           <Button onClick={onLogout}>Cerrar sesion</Button>
           <Button onClick={() => setShowModal(false)}>Cancelar</Button>
       </div>
   );
}
