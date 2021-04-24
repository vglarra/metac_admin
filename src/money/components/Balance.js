import React, { useContext } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import { GlobalContext } from "../context/MoneyGlobalState";

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <Container>
      <Row>
        <Col>
          <h4>Balance: ${total}</h4>
        </Col>
      </Row>
    </Container>
  );
};
