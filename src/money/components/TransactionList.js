import React, { useContext, useState, useEffect, useReducer } from "react";
import { Alert } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { GlobalContext } from "../context/MoneyGlobalState";
import dbCallGasto from "../../services/db-services/user.gasto.model";
import { GastoTable } from "./tables/GastoTable";
import AuthService from "../../services/auth.service";
import Swal from "sweetalert2";
import { ToastContext } from "../../global_context/ToastContext";
import "./transactionLst.css";

export const TransactionList = () => {
  const [gasto, setGasto] = useState([]);
  const { updateService, revStateGastoLst } = useContext(GlobalContext);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const { showToast } = useContext(ToastContext);
  const [reactTableInstance, setReactTableInstance] = React.useState([]);
  const [canPreviousPage, setCanPreviousPage] = useState(null);
  const [canNextPage, setCanNextPage] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageOptions, setPageOptions] = useState(0);
  const currentUser = AuthService.getCurrentUser();
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    funcCsuGasto();
  }, [updateService.refreshStateGasto]);

  const funcCsuGasto = () => {
    dbCallGasto.postCsuGasto(currentUser.id).then(
      (response) => {
        if (!response.data["data"]) {
          setIsEmpty(true);
          setEmptyMessage(response.data["message"]);
        } else {
          setIsEmpty(false);
          var obj = response.data;
          var gastoArray = Object.keys(obj).map((key) => obj[key])[0];
          //setGasto(gastoArray);
          var balance = 0;
          for (let i = 0; i < gastoArray.length; i++) {
            balance += gastoArray[i].tgu_mon_gas;
          }
          setCurrentBalance(balance);
          const data = gastoArray.map((gastos) => ({
            cod_gas: gastos.tgu_cod_gas,
            desc: gastos.ttg_des_gas,
            monto: monedas(gastos.tgu_mon_gas),
          }));
          setGasto(data);
        }

        revStateGastoLst();
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

  const handleBalance = () => {};

  const monedas = (amount) => {
    // Create our number formatter.
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      //currency: 'USD',
      currency: "USD",
      // These options are needed to round to whole numbers if that's what you want.
      // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(amount);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Cod",
        accessor: "cod_gas",
      },
      {
        Header: "Desc",
        accessor: "desc",
      },
      {
        Header: "Monto",
        accessor: "monto",
      },
    ],
    []
  );

  const handleExpenseDelete = () => {
    if (selectedRows.length === 0) {
      Swal.fire({
        title: "Alerta!",
        text: "Debes seleccionar un item.",
        icon: "warning",

        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    } else {
      let alertText = "";
      if (selectedRows.length > 1) {
        alertText =
          "Esta Apunto de Borrar " + selectedRows.length + " registros...";
      } else {
        alertText =
          "Esta Apunto de Borrar " + selectedRows.length + " registro...";
      }
      Swal.fire({
        title: "¿Esta Segur@?",
        text: alertText,
        icon: "warning",
        //showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: "No eliminar",
        //cancelButtonText: 'Cancelar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          let cnt = 0;
          var deleteMessageResult = "";
          for (let i = 0; i < selectedRows.length; i++) {
            var codGasto = selectedRows[i].cod_gas;
            dbCallGasto.eliminarGasto(currentUser.id, codGasto).then(
              (response) => {
                cnt += 1;
                if (selectedRows.length === cnt) {
                  if (cnt === 1) {
                    showToast({
                      message: response.data["message"] + " " + cnt + " Item",
                    });
                    funcCsuGasto();
                  } else {
                    showToast({
                      message: response.data["message"] + " " + cnt + " Items",
                    });
                    funcCsuGasto();
                  }
                }
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
          }
        } else {
          showToast({ message: "No se realizó la Eliminación" });
        }
      });
    }
  };

  const handlePreviousPage = () => {
    reactTableInstance.previousPage();
    setCanNextPage(reactTableInstance.canNextPage);
    setCanPreviousPage(reactTableInstance.canPreviousPage);
  };

  const handleNextPage = () => {
    reactTableInstance.nextPage();
    setCanNextPage(reactTableInstance.canNextPage);
    setCanPreviousPage(reactTableInstance.canPreviousPage);
  };

  const reactTableInstanceSend = (instance) => {
    setReactTableInstance(instance);
    //console.log("Here is the instance", instance);
    setPageIndex(JSON.stringify(instance.state.pageIndex));
    setPageOptions(JSON.stringify(instance.pageOptions.length));
    setCanNextPage(reactTableInstance.canNextPage);
    setCanPreviousPage(reactTableInstance.canPreviousPage);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            {isEmpty ? (
              <Alert variant="info">
                <p>
                  <strong>{emptyMessage}..</strong> debes crear un tipo de
                  gasto!
                </p>
              </Alert>
            ) : (
              <div className="react-table-gas">
                <ButtonGroup size="sm" className="mb-2">
                  <Button variant="secondary" onClick={handleExpenseDelete}>
                    Borrar
                  </Button>
                </ButtonGroup>
                <GastoTable
                  columns={columns}
                  data={gasto}
                  setSelectedRows={setSelectedRows}
                  getInstanceCallback={reactTableInstanceSend}
                />

                <div className="-pagination">
                  <button
                    className="-btn -previous"
                    onClick={handlePreviousPage}
                    disabled={!canPreviousPage}
                  >
                    <strong>{"<"}</strong>
                  </button>{" "}
                  <span className="-pageInfo">
                    Pág.{" "}
                    <strong>
                      {parseInt(pageIndex) + 1} de {pageOptions}
                    </strong>
                  </span>{" "}
                  <button
                    className="-btn -next"
                    onClick={handleNextPage}
                    disabled={!canNextPage}
                  >
                    <strong>{">"}</strong>
                  </button>
                </div>

                <p>Filas seleccionadas: {selectedRows.length}</p>
                <p>Total gasto: -{monedas(currentBalance)}</p>
                
                {/*                 <pre>
                  <code>
                    {JSON.stringify(
                      {
                        selectedRows,
                      },
                      null,
                      2
                    )}
                  </code>
                </pre> */}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
