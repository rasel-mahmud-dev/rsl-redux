import React from 'react';

const Loader = ({className = "", title, titleClass}) => {
    return (
        <div className={`${className}`}>
            <div className={`fixed top-1/3 left-1/2 -translate-x-1/2 z-[1023] `}>
                <div className="animate-spin border-b-4 border-pink-500  w-20 h-20 rounded-full "></div>
                {title && <h4 className={`${titleClass} absolute left-1/2 -translate-x-1/2`}>{title}</h4>}
            </div>
            <div className="fixed top-0 left-0 w-full h-screen bg-black/60 z-[1000] loader-backdrop"></div>
        </div>

    );
};

export default Loader;