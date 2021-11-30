import React, { HTMLProps } from "react";
import './Content.css';

export default function Content({ children }: HTMLProps<any>) {
    return (
        <div className='app-content'>
            {children}
        </div>
    );
}