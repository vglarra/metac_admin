import React, { useContext } from 'react';
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { GlobalContext } from '../context/MoneyGlobalState';

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <Container>
      <Row>
        <Col>
          <h4>Ingresos</h4>
          <p className="money plus">{income}</p>
        </Col>
        <Col>
          <h4>Gastos</h4>
          <p className="money minus">{expense}</p>
        </Col>
      </Row>
    </Container>
  );
}
