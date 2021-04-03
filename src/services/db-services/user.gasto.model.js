import axios from "axios";
import DbAuthHeader from "../auth-header";

const API_URL = `${process.env.REACT_APP_API_AUTH}/api/auth/`;

const postCsuGasto = (idUser) => {
  return axios.post(
    API_URL + "csu-gas-usr",
    { userId: idUser },
    { headers: DbAuthHeader() }
  );
};

const grabarGasto = (idUser, codTipGas, monto) => {
  return axios.post(
    API_URL + "grb-gas-usr",
    {
      ttg_cod_gas: codTipGas,
      tgu_mod_gas: 0,
      tgu_mon_gas: monto,
      userId: idUser,
    },
    { headers: DbAuthHeader() }
  );
};

//eli-tip-gas-ing
const eliminarGasto = (idUser, idTipGasto) => {
  return axios.post(
    API_URL + "eli-gas-usr",
    { ttg_cod_gas: idTipGasto, userId: idUser },
    { headers: DbAuthHeader() }
  );
};

const actGasto = (idUser, idTipGasto, nameTipGasIng) => {
  return axios.post(
    API_URL + "act-gas-usr",
    {
      ttg_cod_gas: idTipGasto,
      userId: idUser,
      new_des_gas: nameTipGasIng,
    },
    { headers: DbAuthHeader() }
  );
};

export default {
  postCsuGasto,
  grabarGasto,
  eliminarGasto,
  actGasto,
  //... aqui se decalran el resto de las funciones
};
