import React, {useEffect} from 'react';
import CategoryItem from "./CategoryItem.jsx";
import {isArray, useDispatch, useSelector} from "rsl-redux";
import {fetchCategories} from "../../store/actions/categoryAction.js";


function renderSkeleton() {
    return (
        <div className="bg-white  overflow-hidden  rounded-md py-1 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="h-1 w-full bg-slate-200 my-1 py-1 rounded"></div>
            </div>
        </div>
    )
}


const CategoryList = ({onClose}) => {

    const {categories} = useSelector(state=>state.productState)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!categories?.length){
            dispatch(fetchCategories())
        }
    }, [categories?.length]);


    return (
        <div>
            <div>
                <div className="col-span-3 bg-white rounded-2xl py-2 px-2">
                    {(!isArray(categories) || categories?.length === 0) ? Array.from({length: 15}).fill(1).map(_ => (
                        renderSkeleton()
                    )) : (
                        categories.map(item => (
                            <CategoryItem  {...item} onClick={()=>onClose()}  />
                        ))
                    )}

                </div>

            </div>
        </div>
    );
};

export default CategoryList;