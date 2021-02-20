
import dbCallGasto from '../../services/db-services/user.gasto.model';

const refreshGastoLst = () => 
    dbCallGasto.postCsuGasto()
    .then((response) => response.data['data'])
    .then((error) => error.message)


export { refreshGastoLst };