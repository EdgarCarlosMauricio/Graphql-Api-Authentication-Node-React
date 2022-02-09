import { ApolloProvider } from '@apollo/client';
import isJwtTokenExpired from 'jwt-check-expiry';
import React, { useEffect, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import client from './config/apollo';
import AuthContext from './context/AuthContext';
import Auth from './pages/Auth';
import Navigation from './routes/Navigation';
import { decodeToken, getToken, removeToken } from './utils/token';


export default function App() {
  
  
  const [auth, setAuth] = useState(undefined)
  

  useEffect(() => { 
    const token = getToken();

    if (!token) {
      setAuth(null);
    } else { 
      // verificamos que el token no a expirado
      const tokenValido = isJwtTokenExpired(token);
      if (tokenValido) {
        logout();
      } else {
        const verificarToken = decodeToken(token);
        setAuth(verificarToken);
      }
    }
  }, [])

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };
  
  // Usememo es guardar en memoria el resultado en memoria o cache el resultado
  // si llegan lo smismos parametros de entrada devuelve el resultado guardado
  // y evita una renderizacion de componentes no deseada.
  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }), [auth]
  );

  if (auth === undefined) return null;
  
  return (
    <ApolloProvider client={client}>
      
      <AuthContext.Provider value={authData}>

        {!auth ? <Auth /> : <Navigation />}
        <ToastContainer>
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        </ToastContainer>

      </AuthContext.Provider>
     
    </ApolloProvider>
  );
}