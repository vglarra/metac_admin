import React, { useContext, useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
import dbCallGasto from "../../services/db-services/user.gasto.model";
import { GastoTable } from "./tables/GastoTable";
import "./transactionLst.css";

export const TransactionList = () => {
  const [gasto, setGasto] = useState([]);
  const { updateService, revStateGastoLst } = useContext(GlobalContext);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    funcCsuGasto();
  }, [updateService.refreshStateGasto]);

  const funcCsuGasto = () => {
    dbCallGasto.postCsuGasto().then(
      (response) => {
        if (!response.data["data"]) {
          setIsEmpty(true);
          setEmptyMessage(response.data["message"]);
        } else {
          setIsEmpty(false);
          var obj = response.data;
          var gastoArray = Object.keys(obj).map((key) => obj[key])[0];
          //setGasto(gastoArray);
          //alert(JSON.stringify(gastoArray));
          const data = gastoArray.map((gastos) => ({
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

  const monedas = (amount) => {
    // Create our number formatter.
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      //currency: 'USD',
      currency: "CLP",
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(amount);
  };

  const columns = React.useMemo(
    () => [
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
                <GastoTable columns={columns} data={gasto} />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

{
  /* <ListGroup>
{gasto.map((gastos) => (
  <ListGroup.Item
    as="li"
    action
    variant="light"
    key={gastos.tgu_cod_gas}
  >
    <Row>
      <Col sm={1}>
        <input
          type="checkbox"
          //value={label}
          //checked={isChecked}
          //onChange={this.toggleCheckboxChange}
        />
      </Col>
      <Col sm={2}>{gastos.ttg_des_gas}</Col>
      <Col sm={2}>{monedas(gastos.tgu_mon_gas) + " $"}</Col>
    </Row>
  </ListGroup.Item>
))}
</ListGroup> */
}
