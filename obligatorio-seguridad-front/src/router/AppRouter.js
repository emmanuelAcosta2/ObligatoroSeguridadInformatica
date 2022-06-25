import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { LoginScreen } from "../components/auth/LoginScreen";
import { startChecking } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Estudiante } from "../components/pages/Estudiante";
import { Admin } from "../components/pages/Admin";
let isAdmin = process.env.REACT_APP_ROL_ESTUDIANTE;
export const AppRouter = () => {

  //TODO: No se debería redirigir a Mantenimiento Ganadero, deberíamos redirigir a un HomePage para que el usuario haga lo que se le plazca.
  const dispatch = useDispatch();
  const { checking, uid, roles } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Espere...</h5>;
  }

  return (
    <BrowserRouter >
      <Routes>
 

        <Route
          path="/*"
          element={
            <PrivateRoute isAuth={!!uid} roles = {roles}>
              
              
              {console.log(roles)}
              {roles !== undefined && roles.includes(process.env.REACT_APP_ROL_ADMIN) ? (<Admin/>) : (<Estudiante/>)}
            </PrivateRoute>
          }
        />
        
               <Route
          path="/login"
          element={
            <PublicRoute isAuth={!!uid} >
              <LoginScreen/>
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
