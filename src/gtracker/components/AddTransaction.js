import React, {useState, useContext, useEffect} from 'react';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';
import DbUserService from '../.././services/db-services/user.db-calls';
import ModalLstTipGasIng from './ModalLstTipGasIng';
import './addTransaction.css';
import Swal from "sweetalert2";
import {ToastContext} from '../context/ToastContext';

export const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const {showToast,} = useContext(ToastContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [nombreGasto, setNombreGasto] = useState("");
  const [tipoGasto, setTipoGasto] = React.useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {

    funcCsuTipGasIng();

  }, []);

  const funcCsuTipGasIng = () =>  {
    //setTipoGasto([]);
    DbUserService.postCsuTipGasIng().then(
      (response) => {
        var obj = response.data;
        //setTipoGasto(result);
        var gastoArray = Object.keys(obj).map((key) => obj[key])[0];
        setTipoGasto(gastoArray);
        //alert(JSON.stringify(gastoArray));
      },  
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        alert(_content);
      }
    );
  }; 

  const validateAddTransaction = (e) => {
    
    if (!text) {
      Swal.fire({
        title: 'Alerta!',
        text: "Debes seleccionar un gasto o ingreso.",
        icon: 'warning',

        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      } else {
      onSubmit(e);
    }
    e.preventDefault();
  };




  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);
    setText("");
    setAmount(0);
    showToast({message: 'Se ingresó el gasto exitosamente!'});
  };
  // {"mod_tip_gas_ing":[{"id":1,"nombre_gasto_ingreso":"agua"},{"id":2,"nombre_gasto_ingreso":"luz"}]}
  // <p>Gasto: {tipoGasto.mod_tip_gas_ing.nombre_gasto_ingreso}</p>
  return (
    <div className="container">
      <Form onSubmit={validateAddTransaction}>
        <h3>Add new transaction</h3>

        <Form.Row>
          <Col>
            <Form.Label type="text">Text</Form.Label>
          </Col>
          <Col>
            <Form.Label type="text">
              Amount <br />
              (negative - expense, positive - income)
            </Form.Label>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control
              as="select"
              value={text}
              onChange={(e) => setText(e.target.value)}
            >
              <option>Seleccione un gasto...</option>
              {tipoGasto.map((gasto, key) => (
                    <option key={key} value={gasto.nombre_gasto_ingreso}>
                      {gasto.nombre_gasto_ingreso}
                    </option>
                ))
              }
            </Form.Control>
          </Col>
          <Col>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
            />
          </Col>
        </Form.Row>
        <br />
        <Form.Row>
          <Col>
            <Button type="submit" >
              Add transaction
            </Button>
          </Col>
          <Col>
            <Button
              className="boton-agregar-gasto"
              variant="secondary"
              onClick={() => setModalShow(true)}
            >
              Crear un gasto o Ingreso
            </Button>
          </Col>
        </Form.Row>
      </Form>

      <div>
         <ModalLstTipGasIng
          show={modalShow}
          onHide={() => setModalShow(false)}
          refresh={funcCsuTipGasIng}
          tipo_gasto_modal={tipoGasto}
        />
      </div>
    </div>
  );
};




