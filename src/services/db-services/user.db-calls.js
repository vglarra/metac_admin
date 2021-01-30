import axios from "axios";
import DbAuthHeader from "../db.auth-service";
import AuthService from "../auth.service";

const currentUser = AuthService.getCurrentUser();
const API_URL = "http://node.humanapp.space:5000/api/auth/";

const postCsuTipGasIng = () => {
  return axios.post(API_URL + "csu-tip-gas-ing", 
  { userId : currentUser.id },
  { headers: DbAuthHeader()}

  );
};

const postGrbTipGasIng = (tipGasto) => {
  return axios.post(API_URL + "grb-tip-gas-ing", 
  { userId : currentUser.id, nombre_gasto_ingreso: tipGasto },
  { headers: DbAuthHeader()}

  );
}; 

//eli-tip-gas-ing
const delEliTipGasIng = (idTipGasto) => {
  return axios.post(API_URL + "eli-tip-gas-ing", 
  { userId : currentUser.id, id: idTipGasto },
  { headers: DbAuthHeader()}

  );
}; 

const actTipGasIng = (idTipGasto, nameTipGasIng ) => {
  return axios.post(API_URL + "act-tip-gas-ing", 
  { userId : currentUser.id, 
    id: idTipGasto, 
    nombre_gasto_ingreso: nameTipGasIng },
  { headers: DbAuthHeader()}

  );
}; 

export default {
  postCsuTipGasIng,
  postGrbTipGasIng,
  delEliTipGasIng,
  actTipGasIng,
    //... aqui se decalran el resto de las funciones
};