import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function SweetAlert() {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        title: <p>Hello World</p>,
        footer: "Copyright 2018",
        didOpen: () => {
        // `MySwal` is a subclass of `Swal`
        //   with all the same instance & static methods
        MySwal.clickConfirm();
        },
    }).then(() => {
        return MySwal.fire(<p>Shorthand works too</p>);
    });

};