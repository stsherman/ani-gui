import React from "react";

export default function MaterialIcon({ className, ...props }: any) {
    return (
        <span {...props} className={`${className || ''} material-icons`} />
    );
}