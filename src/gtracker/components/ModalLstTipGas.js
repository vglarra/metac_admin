import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import DbUserService from "../../services/db-services/user.tipoGasto.model";
import { GlobalContext } from "../context/GlobalState";
import { ToastContext } from "../context/ToastContext";
import Swal from "sweetalert2";
import "./modalLstTipGas.css";

function ModalLstTipGas(props) {
  const { showToast } = useContext(ToastContext);
  const { reloadComboxTipGas } = useContext(GlobalContext);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [itemGasto, setItemGasto] = useState("");
  const [idItemGasto, setIdItemGasto] = useState("");
  const [tipoGasto, setTipoGasto] = useState([]);
  const [showModifyButton, setShowModifyButton] = useState(false);

  useEffect(() => {
    csuTipGasFunc();
  }, []);

/**
 * Consulta a BD y realiza setTipoGasto(gastoArray).
 */
  const csuTipGasFunc = () => {
    //setTipoGasto([]);
    DbUserService.postCsuTipGas().then(
      (response) => {
        if (!response.data["data"]) {
          setIsEmpty(true);
          setEmptyMessage(response.data["message"]);
        } else {
          var obj = response.data;
          var gastoArray = Object.keys(obj).map((key) => obj[key])[0];
          setTipoGasto(gastoArray);
        }
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        showToast({ _content });
      }
    );
  };

  const handleConfirmDelete = (idGasto) => {
    Swal.fire({
      title: "¿Esta Segur@?",
      text: "Esta Apunto de Borrar un registro...",
      icon: "warning",
      //showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Siga",
      denyButtonText: "No eliminar",
      //cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleEliGas(idGasto);
      } else {
        showToast({ message: "No se realizó la Eliminación" });
      }
    });
  };

/**
 * Alerta vacío con Swal y agrega un tipo de gasto.
 */
  const handleAgregarGastoSubmit = () => {
    if (!itemGasto) {
      Swal.fire({
        title: "Alerta!",
        text: "Debes ingresar un gasto o ingreso.",
        icon: "warning",

        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    } else {
      DbUserService.grbTipGas(itemGasto).then(
        (response) => {
          var obj = response.data;
          //setTipoGasto(result);
          var result = Object.keys(obj).map((key) => obj[key])[0];
          setIsEmpty(false);
          setItemGasto("");
          showToast({ message: result });
          csuTipGasFunc();
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          showToast({ _content });
        }
      );
    }
  };

  const handleEliGas = (idItemGasIng) => {
    DbUserService.delEliTipGas(idItemGasIng).then(
      (response) => {
        var obj = response.data;
        //setTipoGasto(result);
        var result = Object.keys(obj).map((key) => obj[key])[0];
        showToast({ message: result });
        csuTipGasFunc();
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        showToast({ _content });
      }
    );
  };

  const handleModify = () => {
    DbUserService.actTipGas(idItemGasto, itemGasto).then(
      (response) => {
        var obj = response.data;
        //setTipoGasto(result);
        var result = Object.keys(obj).map((key) => obj[key])[0];
        showToast({ message: result });
        csuTipGasFunc();
        setItemGasto("");
        setShowModifyButton(false);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        showToast({ _content });
      }
    );
  };

  const getModifyValues = (id, name) => {
    setItemGasto(name);
    setIdItemGasto(id);
    setShowModifyButton(true);
  };

  //----------- Pasando props a travez de una function
  const handleInitialModButton = () => {
    setItemGasto("");
    reloadComboxTipGas();
    props.onHide(); //--Solo se transforma a función
  };
  //------------------------------------------------

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Crear Tipo de Gasto
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Lista</p>
        {/* nested button inside a dynamic listgroup must be refered as ul an li */}
        {isEmpty ? (
          <div>
            <Alert variant="info">
              <p>
                <strong>{emptyMessage}..</strong> Crea un tipo de gasto!
              </p>
            </Alert>
          </div>
        ) : (
          <ListGroup as="ul">
            {tipoGasto.map((gasto, key) => (
              <ListGroup.Item
                as="li"
                action
                variant="light"
                key={gasto.ttg_cod_gas}
              >
                <Row>
                  <Col sm={8}>{gasto.ttg_des_gas}</Col>
                  <Col sm={4}>
                    <ButtonGroup size="sm" className="button-mod-eli">
                      <Button
                        variant="outline-primary"
                        style={{ margin: 2 }}
                        onClick={() =>
                          getModifyValues(gasto.ttg_cod_gas, gasto.ttg_des_gas)
                        }
                      >
                        Modificar
                      </Button>
                      <Button
                        variant="outline-danger"
                        style={{ margin: 2 }}
                        onClick={() => handleConfirmDelete(gasto.ttg_cod_gas)}
                      >
                        Eliminar
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Agregar un nuevo gasto.</Form.Label>
            <Form.Control
              type="text"
              placeholder="ingrese ítem..."
              onChange={(e) => setItemGasto(e.target.value)}
              value={itemGasto}
            />

            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {showModifyButton ? (
          <Button variant="success" onClick={handleModify}>
            Modificar
          </Button>
        ) : (
          <Button variant="danger" onClick={handleAgregarGastoSubmit}>
            Agregar
          </Button>
        )}

        <Button onClick={handleInitialModButton}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalLstTipGas;
