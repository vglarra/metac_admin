import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [content, setContent] = useState("");

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
    <div className="container">
      {isAuthorized ? (
        <header className="jumbotron">
          <h3>
            Hola, <strong>{currentUser.username}</strong>
          </h3>

          <p>
            <strong>Correo:</strong> {currentUser.email}
          </p>
          <strong>Rol:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </header>
      ) : (
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      )}
    </div>
  );
};

export default Profile;
