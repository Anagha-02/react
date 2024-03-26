import React from "react";
import Button from "../Layout/Button";

function Users({name}) {
    console.log("Rerendering")
    return (
        <span className="userName">Hello {name}</span>
    )
}

export default React.memo(Users)