import React from "react";

export default ({text, className}) => {
    return (
        <span className={`badge ${className || ""}`}>
            {text}
        </span>
    )
}