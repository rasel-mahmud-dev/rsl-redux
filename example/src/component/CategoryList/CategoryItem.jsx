import React from 'react';
import {Link} from "react-router-dom";
import getAssetPath from "../../utils/getAssetPath.js";

const CategoryItem = ({image, name,  slug}) => {
    return (
        <Link to={`/p/${slug}`}>
            <div className="flex items-center gap-x-2 text-sm py-2 text-gray-800 font-medium hover:bg-pink-400/10 px-2 rounded-lg ">
                <div className="">
                    <img className="w-6 h-6 object-contain flex" src={getAssetPath(image)} alt=""/>
                </div>
                <h4>{name}</h4>
            </div>
        </Link>
    );
};

export default CategoryItem;