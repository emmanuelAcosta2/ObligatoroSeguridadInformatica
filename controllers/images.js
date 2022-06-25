const { response } = require("express");
const path = require("path");

const getImageAdmin = async (req, res = response) => {
  const roles = req.roles;
  const rolesList = Object.values(roles);

  try {
    if (!rolesList.includes(process.env.REACT_APP_ROL_ADMIN)) {
      console.log("ADMIN");
      const respuesta = res.status(400).json({
        ok: false,
        msg: "No tiene permisos suficientes",
      });
      console.log(respuesta)
      return respuesta;
    }
    console.log('readable')
    return res.sendFile(path.resolve("./administrator.jpg"));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const getImageStudent = async (req, res = response) => {
  const roles = req.roles;
  const rolesList = Object.values(roles);

  try {
    if (!rolesList.includes(process.env.REACT_APP_ROL_ESTUDIANTE)) {
      console.log("Estudiante");
      return res.status(400).json({
        ok: false,
        msg: "No tiene permisos suficientes",
      });
    } else {
      return res.sendFile(path.resolve("./common-user.jpg"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  getImageAdmin,
  getImageStudent,
};
