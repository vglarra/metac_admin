import React, { useState, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import DbUserService from "../.././services/db-services/user.db-calls";
import { ToastContext } from "../context/ToastContext";
import Swal from "sweetalert2";

function ModalLstTipGasIng(props) {
  const { showToast } = useContext(ToastContext);
  const [itemGasto, setItemGasto] = useState("");
  const [idItemGasto, setIdItemGasto] = useState("");
  const [tipoGasto, setTipoGasto] = useState([]);
  const [showModifyButton, setShowModifyButton] = useState(false);

  useEffect(() => {
    funcCsuTipGasIng();
  }, []);

  const funcCsuTipGasIng = () => {
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

        showToast({ _content });
      }
    );
  };

  const handleConfirmDelete = (id) => {
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
        handleEliGasIng(id);
      } else {
        showToast({ message: "No se realizó la Eliminación" });
      }
    });
  };

  const handleAgregarGastoSubmit = () => {

    if (!itemGasto) {
      Swal.fire({
        title: 'Alerta!',
        text: "Debes ingresar un gasto o ingreso.",
        icon: 'warning',
  
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
    } else {
      DbUserService.postGrbTipGasIng(itemGasto).then(
        (response) => {
          var obj = response.data;
          //setTipoGasto(result);
          var result = Object.keys(obj).map((key) => obj[key])[0];
          showToast({ message: result });
          setItemGasto("");
          funcCsuTipGasIng();
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
  };




  const handleEliGasIng = (idItemGasIng) => {
    DbUserService.delEliTipGasIng(idItemGasIng).then(
      (response) => {
        var obj = response.data;
        //setTipoGasto(result);
        var result = Object.keys(obj).map((key) => obj[key])[0];
        showToast({ message: result });
        funcCsuTipGasIng();
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
    DbUserService.actTipGasIng(idItemGasto, itemGasto).then(
      (response) => {
        var obj = response.data;
        //setTipoGasto(result);
        var result = Object.keys(obj).map((key) => obj[key])[0];
        showToast({ message: result });
        funcCsuTipGasIng();
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

  //----------- Pasando props a travez de una fuction
  const handleInitialModButton = () => {
    setItemGasto("");
    setShowModifyButton(false);
    props.refresh();
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
          Crear Gasto o Ingreso
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Lista</p>
        {/* nested button inside a dynamic listgroup must be refered as ul an li */}
        <ListGroup as="ul">
          {tipoGasto.map((gasto, key) => (
            <ListGroup.Item as="li" action variant="light" key={gasto.id}>
              <Row>
                <Col sm={8}>{gasto.nombre_gasto_ingreso}</Col>
                <Col sm={4}>
                  <ButtonGroup size="sm" className="button-mod-eli">
                    <Button
                      variant="outline-primary"
                      style={{ margin: 2 }}
                      onClick={() =>
                        getModifyValues(gasto.id, gasto.nombre_gasto_ingreso)
                      }
                    >
                      Modificar
                    </Button>
                    <Button
                      variant="outline-danger"
                      style={{ margin: 2 }}
                      onClick={() => handleConfirmDelete(gasto.id)}
                    >
                      Eliminar
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Agregar un gasto/ingreso.</Form.Label>
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

export default ModalLstTipGasIng;
