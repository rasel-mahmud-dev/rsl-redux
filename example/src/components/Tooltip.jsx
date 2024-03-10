
import React from 'react';
//
// type Props = {
//     children: any
//     className?: string
//     tips?: string
// }

const Tooltip = (props) => {
    const {children, contentClass= "truncate-break-sm", className = "", tips} = props
    return (
        <a
            className={className}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={tips}
            data-tooltip-place="top"
        >
            <div className={contentClass}>{children}</div>
        </a>
    );
};


export default Tooltip;