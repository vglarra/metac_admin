import React, { useContext } from 'react';
import { Transaction } from './Transaction';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import { GlobalContext } from '../context/GlobalState';



export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <Container>
        <Row>
          <Col>
            <ul className="">
              {transactions.map((transaction) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}
