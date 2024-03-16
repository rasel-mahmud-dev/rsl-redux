import React, {useEffect, useRef, useState} from 'react';
import {isArray, useDispatch, useSelector} from "rsl-redux";
import Product from "../components/Product.jsx";
import {fetchProducts} from "../store/actions/productAction.js";
import HeroBanner from "../components/HeroBanner.jsx";
import getAssetPath from "../utils/getAssetPath.js";
import ProductSkeleton from "../components/Product.Skeleton.jsx";
import {Spinner} from "../components/Loader.jsx";
import inCart from "../utils/inCart.js";
import {useNavigate} from "react-router-dom";


const Products = () => {
    const { showCategories, homeProducts} = useSelector((state) => state.productState)
    const {carts} = useSelector((state) => state.cartState)
    const navigate = useNavigate()

    const [pageNumber, setPageNumber] = useState(1);
    const [isEmpty, setEmpty] = useState(false);
    const pageRef = useRef([]);

    const [isFetching, setFetching] = useState(false)
    const dispatch = useDispatch()

    function handleLoadMore() {
        setPageNumber(prevState => {
            if (!pageRef.current.includes(prevState + 1)) {
                pageRef.current.push(prevState + 1)
                return prevState + 1
            }
            return prevState
        })
    }

    useEffect(() => {
        if (isEmpty) return;
        setFetching(true)
        dispatch(fetchProducts(pageNumber)).unwrap().then(items => {
            if (items && Array.isArray(items) && items?.length === 0) {
                setEmpty(true)
            }
        }).finally(() => {
            setFetching(false)
        })
    }, [pageNumber]);


    function getAllProducts(homeProducts) {
        let a = Object.keys(homeProducts).sort((a, b) => a - b)
        let p = []
        for (let page of a) {
            if (homeProducts[page]) {
                p.push(...homeProducts[page])
            }
        }
        return p
    }

    return (
        <div>
            <div className="home-category-list">
                <div
                    className="flex items-center justify-between max-w-8xl mx-auto  gap-x-2 md:gap-x-4 scroll-x-transparent overflow-x-auto md:overflow-visible ">
                    {showCategories.map((cat) => (
                        <div key={cat._id} className="home-category-list-item">
                            <div onClick={() => navigate(`/p/${cat.slug}`)}
                                 className="flex home-category-list-item-content flex-col items-center  border md:border-none rounded-full md:bg-transparent ">
                                <img alt={cat.name} className="category-list-item-img" src={getAssetPath(cat.image)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <HeroBanner showCategories={showCategories}/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 lg:gap-6 mt-4">
                {getAllProducts(homeProducts).map(product => (
                    <Product cartId={inCart(carts, product._id)?._id} key={product._id} {...product} />
                ))}

                {!isArray(getAllProducts(homeProducts)) || getAllProducts(homeProducts)?.length === 0 && Array.from({length: 20}).fill(1).map(item => (
                    <ProductSkeleton key={item}/>
                ))}

            </div>

            <div className="mb-20 mt-10 flex flex-col justify-center items-center">
                {isFetching ? <Spinner title="Loading..." className="w-8 h-8 border-t-primary-500 "/> :
                    <button className="btn primary-btn mx-auto block w-max " onClick={handleLoadMore}>Load
                        More</button>}
            </div>
        </div>
    );
};


export default Products;