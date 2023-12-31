import * as React from "react";
import useAuth from "../hooks/useAuth";
import ModalNuevoProduct from "../components/ModalNuevoProduct";
import ModalUpdateProduct from "../components/ModalUpdateProduct";
import ModalDeleteProduct from "../components/ModalDeleteProduct";
import clienteAxios from "../axios/clienteAxios";
import InfoUser from "../components/InfoUser";
import ModalCambiarPassword from "../components/ModalCambiarPassword";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Profile = () => {
  const { auth, usuarios } = useAuth();
  const user = auth.user;

  if (!user) {
    return (
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="success" />
      </Stack>
    );
  }

  const { nombre, apellido, email, role, admin } = user;

  return (
    <div className=" xl:pl-60 sm:pl-20">
      <div className="bg-white rounded-lg  items-center shadow-2xl m-10 p-10  ">
        <div className="pr-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Información del Perfil</h2>
            <h3 className="text-2xl font-bold mt-4">
              Nombre: {nombre} {apellido}
            </h3>
            <p className="text-2xl pt-2 font-semibold">
              {" "}
              Role :{" "}
              <span className="text-3xl font-black text-indigo-600">
                {role}{" "}
              </span>{" "}
            </p>
            <p className="text-2xl pt-2 font-semibold">
              {" "}
              Admin :{" "}
              <span className="text-3xl font-black text-indigo-600">
                {admin ? "True" : "False"}
              </span>{" "}
            </p>
            <p className="text-2xl font-semibold pt-2">Email: {email}</p>
            <ModalCambiarPassword />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg  text-center  shadow-2xl m-10 p-10 ">
        {role === "premium" || admin ? (
          <div className=" pl-4 text-center mt-5">
            <h3 className="text-2xl font-semibold">Administrar Productos</h3>
            <div className="flex flex-col items-center mt-10">
              <ModalNuevoProduct />
              <ModalDeleteProduct />
              <ModalUpdateProduct />
            </div>
          </div>
        ) : (
          <h3 className="text-2xl font-semibold">
            Solo el administrador o los usuarios premium pueden administrar los
            productos
          </h3>
        )}
      </div>
      <div className="bg-white rounded-lg  text-center  shadow-2xl m-10 p-10 ">
        {admin ? (
          <div className=" pl-4 text-center mt-5">
            <h3 className="text-2xl font-semibold">Administrar Usuarios</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center mt-10 ">
              {usuarios.map((user) => (
                <InfoUser key={user._id} user={user} />
              ))}
            </div>
          </div>
        ) : (
          <h3 className="text-2xl font-semibold">
            Solo el administrador puede administrar los usuarios
          </h3>
        )}
      </div>
    </div>
  );
};

export default Profile;
