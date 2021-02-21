import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Container } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <Container>
      <li className={transaction.amount < 0 ? "minus" : "plus"}>
        {transaction.text}{" "}
        <span>
          {sign}${Math.abs(transaction.amount)}
        </span>
        <Button
          variant="danger"
          onClick={() => deleteTransaction(transaction.id)}
          className="delete-btn"
        >
          x
        </Button>
      </li>
    </Container>
  );
}
