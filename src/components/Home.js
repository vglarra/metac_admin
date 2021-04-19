import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import bgimage from './images/metacoinz3.jpg';
import { Image } from 'react-bootstrap';


const Home = () => {
  const [content, setContent] = useState("");

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
{/*        <header className="jumbotron" style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', height: 500 }}>
        <h3 style={{ textAlign: 'right' }}>{content}</h3>
      </header> */}

      <Image src={bgimage}  style={{ height: 350, paddingLeft: 380 }}/>
    </div>

  );
};

export default Home;
