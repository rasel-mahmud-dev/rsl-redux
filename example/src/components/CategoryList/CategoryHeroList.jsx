import React from 'react';
import CategoryItem from "./CategoryItem.jsx";
import {isArray, useDispatch} from "rsl-redux";
import getAssetPath from "../../utils/getAssetPath.js";
import {setSidebar} from "../../store/slices/authSlice.js";

function renderSkeleton() {
    return (
        <div className="bg-white  overflow-hidden  rounded-md py-1 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="h-1 w-full bg-slate-200 my-1 py-1 rounded"></div>
            </div>
        </div>
    )
}

const CategoryHeroList = ({categories}) => {
    const dispatch = useDispatch()
    return (
        <div>
            <div className="col-span-3 bg-white rounded-2xl py-2 px-2">

                {(!isArray(categories) || categories?.length === 0) ? Array.from({length: 15}).fill(1).map(_ => (
                    renderSkeleton()
                )) : (
                    categories.map(item => (
                        <CategoryItem  {...item}/>
                    ))
                )}


                <div onClick={()=> dispatch(setSidebar("category"))} className="flex items-center gap-x-2 text-sm py-2 text-gray-800 font-medium  category-list-item px-2 rounded-lg ">
                    <div className="">
                        <img className="w-6 h-6 object-contain flex" src={getAssetPath("image")} alt=""/>
                    </div>
                    <h4 className="text-primary-500">Show All</h4>
                </div>

            </div>

        </div>
    );
};

export default CategoryHeroList;