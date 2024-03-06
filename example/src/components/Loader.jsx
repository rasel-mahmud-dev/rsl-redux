import React from 'react';

const Loader = ({className = "", title, titleClass}) => {
    return (
        <div className={`${className}`}>
            <div className={`fixed top-1/3 left-1/2 -translate-x-1/2 z-[1023] `}>
                <div className="animate-spin border-8 border-t-primary-500  w-20 h-20 rounded-full "></div>
                {title && <h4 className={`${titleClass} absolute left-1/2 -translate-x-1/2`}>{title}</h4>}
            </div>
            <div className="fixed top-0 left-0 w-full h-screen bg-black/60 z-[1000] loader-backdrop"></div>
        </div>

    );
};

export const Spinner = ({rootClass = "", className = "", title, titleClass}) => {
    return (
        <div className={`${rootClass} flex flex-col justify-center items-center`}>
            <div className={`${className} rounded-full w-10 h-10 animate-spin border-4`} />
            {title && <h4 className={`${titleClass} text-xs font-semibold`}>{title}</h4>}
        </div>

    );
};

export default Loader;