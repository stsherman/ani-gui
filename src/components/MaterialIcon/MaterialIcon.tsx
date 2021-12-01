import React from "react";

export default function MaterialIcon({ children, className, ...props }: any) {
    return (
        <span {...props} className={`${className || ''} material-icons`}>
            {children}
        </span>
    );
}