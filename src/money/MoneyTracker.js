import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/TransactionList";
import { AddTransaction } from "./components/AddTransaction";
import { Container } from "react-bootstrap";
import UserService from "../services/user.service";

import { GlobalProvider } from "./context/MoneyGlobalState";

import "../App.css";

function Expense() {
  const [content, setContent] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
        setIsAuthorized(true);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setIsAuthorized(false);
        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
      {isAuthorized ? (
        <GlobalProvider>
          <Container>
            <Header />
            <Balance />
            <IncomeExpenses />
            <TransactionList />
            <AddTransaction /> 
          </Container>
        </GlobalProvider>
      ) : (
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      )}
    </div>
  );
}

export default Expense;
