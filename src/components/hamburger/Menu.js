import React, { useEffect, useContext, useState } from "react";
import { ContextApp } from "../../global_context/ContexAppGlobal";



const Menu = (props) => {
    const { menuLenghtSize } = useContext(ContextApp);
    const [height, setHeight] = useState('0%');

    useEffect(() => {
        if (props.open) {
        //do something
            if (menuLenghtSize === 3) {
                setHeight('42%');
            };
            if (menuLenghtSize === 5) {
                setHeight('60%');
            };

        };

    }, [props])

    const styles={
        container: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: props.open ? height: 0,
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        background: 'black',
        opacity: 0.95,
        color: '#fafafa',
        transition: 'height 0.3s ease',
        zIndex: 2,
        },
        menuList: {
        paddingTop: '3rem',
        }
    }
    return(
        <div style={styles.container}>
        {
            props.open ?
            <div style={styles.menuList}>
                {props.children}
            </div>:null
        }
        </div>
    );

  };

export default Menu; 