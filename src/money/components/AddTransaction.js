import React, { useState, useContext, useEffect } from "react";
import { Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { GlobalContext } from "../context/MoneyGlobalState";
import dbCallTipoGasto from "../../services/db-services/user.tipoGasto.model";
import dbCallGasto from "../../services/db-services/user.gasto.model";
import ModalLstTipGas from "./ModalLstTipGas";
import "./addTransaction.css";
import Swal from "sweetalert2";
import { ToastContext } from "../../global_context/ToastContext";
import AuthService from "../../services/auth.service";

export const AddTransaction = () => {
  const { reloadGastoLst, revStateComboxTipGas, updateService } = useContext(
    GlobalContext
  );
  const [emptyMessage, setEmptyMessage] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const { showToast } = useContext(ToastContext);
  const [codGasto, setCodGasto] = useState("");
  const [amount, setAmount] = useState(0);
  const [tipoGasto, setTipoGasto] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    funcCsuTipGas();
  }, [updateService.refreshStateTipoGasto]);

  const funcCsuTipGas = () => {
    //setTipoGasto([]);
    dbCallTipoGasto.postCsuTipGas(currentUser.id).then(
      (response) => {
        if (!response.data["data"]) {
          setIsEmpty(true);
          setEmptyMessage(response.data["message"]);
        } else {
          setIsEmpty(false);
          var obj = response.data;
          var tipoGastoArray = Object.keys(obj).map((key) => obj[key])[0];
          setTipoGasto(tipoGastoArray);
        }
        revStateComboxTipGas();
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
    if (!codGasto) {
      Swal.fire({
        title: "Alerta!",
        text: "Debes seleccionar un gasto o ingreso.",
        icon: "warning",

        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    } else {
      onSubmit(e);
    }
    e.preventDefault();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dbCallGasto.grabarGasto(currentUser.id, codGasto, amount).then(
      (response) => {
        var obj = response.data;
        var gastoArray = Object.keys(obj).map((key) => obj[key])[0];
        setCodGasto("");
        setAmount(0);
        reloadGastoLst();
        showToast({ message: JSON.stringify(gastoArray) });
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

  return (
    <Container>
      <Form onSubmit={validateAddTransaction}>
        <Form.Row>
          <Col>
            <Form.Label type="text">Seleccionar gasto</Form.Label>
          </Col>
          <Col>
            <Form.Label type="text">Monto gasto</Form.Label>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            {isEmpty ? (
              <div>
                <Alert variant="dark">
                  <p>
                    <strong>{emptyMessage}..</strong>
                  </p>
                </Alert>
              </div>
            ) : (
              <Form.Control
                as="select"
                value={codGasto}
                onChange={(e) => setCodGasto(e.target.value)}
              >
                <option>Seleccione un gasto...</option>
                {tipoGasto.map((gasto, key) => (
                  <option key={key} value={gasto.ttg_cod_gas}>
                    {gasto.ttg_des_gas}
                  </option>
                ))}
              </Form.Control>
            )}
          </Col>

          <Col>
            <Button
              className="boton-agregar-gasto"
              variant="secondary"
              onClick={() => setModalShow(true)}
            >
              Editar
            </Button>
          </Col>
          <Col>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ingrese monto..."
            />
          </Col>
          <Col>
            <Button type="submit" variant="success">Agregar</Button>
          </Col>
        </Form.Row>
        <br />
      </Form>
      <ModalLstTipGas
        className="modal"
        show={modalShow}
        onHide={() => setModalShow(false)}
        tipo_gasto_modal={tipoGasto}
      />
    </Container>
  );
};
