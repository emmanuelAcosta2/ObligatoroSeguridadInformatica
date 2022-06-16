import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { LoginScreen } from "../auth/LoginScreen";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startChecking } from "../actions/auth";

export const AppRouter = () => {


  const dispatch = useDispatch();
  const { checking, uid} = useSelector((state) => state.auth);
  
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
            <PrivateRoute isAuth={!!uid} allowedRoles={"estudiante"}>
              <h1>Caca</h1>
            
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
