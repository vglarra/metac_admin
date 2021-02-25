import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import bgimage from './images/metaconz_back_land2.jpg';


const Home = () => {
  const [content, setContent] = useState("");
  const [name, setName] = React.useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);


  return (
    <div className="container">
      <header className="jumbotron" style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', height: 500 }}>
        <h3 style={{ textAlign: 'right' }}>{content}</h3>
      </header>
    </div>
  );
};

export default Home;
