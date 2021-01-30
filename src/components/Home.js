import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const initialList = [
  {
    id: 'a',
    name: 'Robin',
  },
  {
    id: 'b',
    name: 'Dennis',
  },
];

const Home = () => {
  const [content, setContent] = useState("");
  const [list, setList] = React.useState(initialList);
  const [name, setName] = React.useState('');

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


  function handleChange(event) {
    setName(event.target.value);
    // track input field's state
  }
 
  function handleAdd() {
    // add item
    const newList = list.concat({ name });
    alert(JSON.stringify(newList));
 
    setList(newList);
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <div>
      <input type="text" value={name} onChange={handleChange} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
 
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

    </div>
  );
};

export default Home;