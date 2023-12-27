import React from 'react';
import {Link} from "react-router-dom";

const CategoryItem = ({icon, name,  slug}) => {
    return (
        <Link to={`/p/${slug}`}>
            <div className="flex items-center gap-x-2 text-sm py-1 text-gray-800 font-medium  ">
                <span>{icon}</span>
                <span>{name}</span>
            </div>
        </Link>
    );
};

export default CategoryItem;