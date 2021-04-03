import React, { useState, useEffect, useContext } from "react";
import { ContextApp } from "../../global_context/ContexAppGlobal";



const MenuButton = (props) => {
    const { menustate, buttonMenuOff } = useContext(ContextApp);
    const [open, setopen] = useState(false)
    const [color, setColor] = useState(props.color? props.color:'black');


    useEffect(() => { 
        if (menustate.buttonState){ 
            setopen(false);
            buttonMenuOff(); 
        };
    }, [menustate])

   
    const handleClick = () => {
        if (open) {
            setopen(false);
        } else {
            setopen(true);
        };
        props.onClick();
    };
    

    const styles = {
    container: {
        height: '32px',
        width: '32px',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '4px',
    },
    line: {
        height: '2px',
        width: '20px',
        background: color,
        transition: 'all 0.2s ease',
    },
    lineTop: {
        transform: open ? 'rotate(45deg)':'none',
        transformOrigin: 'top left',
        marginBottom: '5px',
    },
    lineMiddle: {
        opacity: open ? 0: 1,
        transform: open ? 'translateX(-16px)':'none',
    },
    lineBottom: {
        transform: open ? 'translateX(-1px) rotate(-45deg)':'none',
        transformOrigin: 'top left',
        marginTop: '5px',
    },       
    };

    return(
    <div style={styles.container} 
        onClick={handleClick}>
        <div style={{...styles.line,...styles.lineTop}}/>
        <div style={{...styles.line,...styles.lineMiddle}}/>
        <div style={{...styles.line,...styles.lineBottom}}/>
    </div>
    );

  };

export default MenuButton;