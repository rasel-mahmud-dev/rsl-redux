import React from 'react';
import { Link } from 'react-router-dom';
import {BsSlash} from "react-icons/bs";


const Breadcrumb = ({selectedCategory}) => {



    return (
        <nav className="text-gray-600">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <Link to="/" className="text-blue-500 hover:text-blue-700 transition duration-300">
                        Home
                    </Link>
                    <BsSlash />
                </li>

                {selectedCategory &&  <li  className="flex items-center">
                    <Link
                        to={`/p/${selectedCategory.slug}`}
                        className="text-blue-500 hover:text-blue-700 transition duration-300"
                    >
                        {selectedCategory.name}
                    </Link>

                </li> }

            </ol>
        </nav>
    );
};

export default Breadcrumb;
