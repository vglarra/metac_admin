import React from "react";

const Footer = (props) => {
  const styles = {
    footer: {
      //position: "absolute",
      bottom: 0,
      width: "100%",
      marginTop: "1rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: props.color,
    },
    line: {
      height: "1px",
      width: "90%",
      background: props.color,
      marginTop: "25px",
    },
    text: {
      padding: "0.5rem",
    },
  };

  return (
    <div style={styles.footer}>
      <div style={styles.line}></div>
      <div style={styles.text}>
        {props.title} por victor larraguibel &copy; 2021
      </div>
    </div>
  );
};

export default Footer;

