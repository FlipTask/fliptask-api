import React, {useEffect, useState} from "react";

const Animation = ({show, children, mountAnimation, unmountAnimation}) => {
    const [shouldRender,
        setRender] = useState(show);

    useEffect(() => {
        if (show){
            setRender(true);
        }
    }
    , [show]);

    const onAnimationEnd = () => {
        
        if (!show){
            
            setRender(false);   
        }
    };
    // console.log(show, "End Animation")
    return (shouldRender && (
        <div
            className={`${show
            ? (mountAnimation || "slideIn")
            : (unmountAnimation || "slideOut")}`}
            onAnimationEnd={onAnimationEnd}>
            {children}
        </div>
    ));
};

export default Animation;