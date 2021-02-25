import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

import UserService from "../services/user.service";

const AdminBoard = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    UserService.getAdminBoard(currentUser.id).then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default AdminBoard;