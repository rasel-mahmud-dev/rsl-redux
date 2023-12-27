import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector, isArray} from "rsl-redux";
import Product from "../component/Product.jsx";
import {fetchProducts} from "../store/actions/productAction.js";
import HeroBanner from "../component/HeroBanner.jsx";
import getAssetPath from "../utils/getAssetPath.js";
import ProductSkeleton from "../component/Product.Skeleton.jsx";
import Loader from "../component/Loader.jsx";


const Products = () => {
    const {products, categories, homeProducts} = useSelector((state) => state.productState)
    const scrollPosition = useRef(0); // Current scroll position
    const [pageNumber, setPageNumber] = useState(1); // Height of the content
    const [isEmpty, setEmpty] = useState(false); // Height of the content
    const divRef = useRef(null); // Ref to the <div> element
    const pageRef = useRef([]); // Ref to the <div> element

    const [isFetching, setFetching] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    function handleScroll(e) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setPageNumber(prevState => {
                if (!pageRef.current.includes(prevState + 1)) {
                    pageRef.current.push(prevState + 1)
                    return prevState + 1
                }
                return prevState
            })
        }
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


    function handleFetchPreviousMessage(e) {
        // if (scrollTop <= 50 && !state.isLoading) {
        //     const {current} = divRef;
        //     if (current) {
        //         let scrollTop = (current.scrollHeight - current.clientHeight)
        //         scrollPosition.current = scrollTop
        //     }
        // }
    }

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
        <div ref={divRef} onScroll={(e) => handleFetchPreviousMessage(e)}>

            {isFetching && <Loader/>}

            <div className="home-category-list">
                <div
                    className="flex items-center justify-between max-w-8xl mx-auto  gap-x-2 md:gap-x-4 scroll-x-transparent overflow-x-auto md:overflow-visible ">
                    {categories.map((cat) => (
                        <div key={cat._id} className="home-category-list-item">
                            <div onClick={()=>navigate(`/p/${cat._id}`)}
                                 className="flex home-category-list-item-content flex-col items-center  border md:border-none rounded-full md:bg-transparent ">
                                <img alt={cat.name} className="category-list-item-img" src={getAssetPath(cat.image)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <HeroBanner categories={categories}/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 lg:gap-6 mt-4">
                {getAllProducts(homeProducts).map(product => (
                    <Product key={product.id} {...product} />
                ))}

                { !isArray(products) || products?.length === 0 ? Array.from({length: 20}).fill(1).map(item=>(
                    <ProductSkeleton key={item} />

                )) : (
                    products.map(product => (
                        <Product key={product.id} {...product} />
                    ))
                )}

            </div>
        </div>
    );
};


export default Products;