import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import getAssetPath from "../../utils/getAssetPath.js";
import {FaAngleDown} from "react-icons/fa";
import {BiStar} from "react-icons/bi";
import {api} from "../../axios/index.js";

import "./ProductDetail.scss"
import RatingReviews from "./RatingReviews.jsx";
import QuestionAnswers from "./QuestionAnswers.jsx";
import {useSelector} from "rsl-redux";

function calculateDiscount(discount, price) {
    let offPrice = ((discount / 100) * price)
    return price - offPrice
}

const ProductDetail = () => {

    const {slug} = useParams();
    const navigate = useNavigate();

    const {auth} = useSelector(state => state.authState)

    const [isShowImage, setShowImage] = React.useState(0);
    const [product, setProduct] = React.useState(null);
    const [productDescription, setProductDescription] = React.useState({});
    const [sellerInfo, setSellerInfo] = React.useState({});
    const productImageListRef = React.useRef < HTMLDivElement > (null);


    const rating = [
        {rating: 1, amount: 20},
        {rating: 2, amount: 30},
        {rating: 3, amount: 10},
        {rating: 4, amount: 20},
        {rating: 5, amount: 10},
    ];
    const highlight = (productDescription && productDescription?.highlight) ? productDescription.highlight : [
        "Tur non nulla sit amet nisl tempus convallis quis ac lectus.",
        "Quisque velit nist tortor eget felis porttitor volutpat",
        " Pellentesque in ip nisl tempus convallis quis ac lectus.",
        "tur non nulla sit amet nisl tempus convallis quis ac lectus."
    ]


    function calculateRate() {
        let subTotalRate = 0;
        let totalAmount = 0;
        rating.map((rate) => {
            subTotalRate += rate.rating * rate.amount;
            totalAmount += rate.amount;
        });
        return (subTotalRate / totalAmount).toFixed(1);
    }

    function totalRating() {
        let totalAmount = 0;
        rating.map((rate) => {
            totalAmount += rate.amount;
        });
        return totalAmount;
    }

    function scrollDownHandler() {
        let s = productImageListRef.current
        s.scrollTop = s.scrollTop + 45;
    }

    function addToCartHandler(product) {

    }

    useEffect(() => {
        if (!slug) return;
        api.get("/products/single?slug=" + slug).then(r => {
            if (r.data) {
                setProduct(r.data);
            }
        })
    }, [slug]);

    console.log(product)

    return (
        <div>
            <div className="">


                <div className="mt-4 container-1920">
                    {product ? (
                        <div className="block lg:grid lg:grid-cols-12 gap-x-6">
                            <div
                                className="description-sidebar dashboard-card !shadow-xxs  col-span-3 custom_scrollbar">
                                <div className="">
                                    <div className="flex flex-col product-sidebar-image-div">
                                        <div className="product-photo--sidebar">
                                            {/*<BiHeart className="text-2xl" />*/}

                                            <div>
                                                <div className="image_list">
                                                    {Array.from({length: 10}).map((item) => (
                                                        <div className="image_list_item">
                                                            <img src={getAssetPath(product?.coverImage)}/>
                                                        </div>
                                                    ))}
                                                    {/*{product.images &&*/}
                                                    {/*    product.images.map((g, i) => (*/}
                                                    {/*        <div*/}
                                                    {/*            onClick={() => setShowImage(i + 1)}*/}
                                                    {/*            className={[isShowImage == i ? "active_image" : "", "image_list_each-div"].join(" ")}*/}
                                                    {/*        >*/}
                                                    {/*            <img src={fullLink(g)} alt="" />*/}
                                                    {/*        </div>*/}
                                                    {/*    ))}*/}
                                                </div>
                                            </div>

                                            <div onClick={scrollDownHandler}
                                                 className="image_list_each-div bb text-center">
                                                <FaAngleDown/>
                                            </div>
                                        </div>

                                        <div className="product_image_view-col--full-image">
                                            <img
                                                src={
                                                    isShowImage
                                                        ? getAssetPath(product.images ? product.images[isShowImage - 1] : "")
                                                        : getAssetPath(product.coverImage ? product.coverImage : "")
                                                }
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5 flex gap-x-4 w-full">
                                        <button
                                            className="btn btn-primary w-full"
                                            onClick={() => addToCartHandler(product)}>Add To Cart
                                        </button>
                                        <button className="btn btn-primary w-full">Buy Now</button>
                                    </div>
                                    {/********* relevant brand **********/}
                                    <div className="mt-5">
                                        {/*<RelevantProducts product={{*/}
                                        {/*    title: product?.title,*/}
                                        {/*    brandId: product?.brandId,*/}
                                        {/*    categoryId: product?.categoryId,*/}
                                        {/*}} slug={params.slug}*/}
                                        {/*/>*/}
                                    </div>


                                </div>
                            </div>
                            <div className="dashboard-card p-4 !shadow-xxs col-span-9">
                                <h4 className="text-lg heading-4 font-medium mb-2">{product.title}</h4>
                                <div className="flex items-center gap-x-1">
                                    <div
                                        className="flex items-center gap-x-1 bg-primary-600 px-2 py-1 text-white rounded-md w-max">
                                        <span>{calculateRate()}</span>
                                        <BiStar/>
                                    </div>
                                    <h5 className="ml-2 text-sm"> 1,50,723 Ratings & 7,095 Reviews</h5>
                                </div>
                                <div className="pt-3 flex items-center">
                                    <h4 className="text-lg font-bold">TK {calculateDiscount(product.discount || 0, product.price || 0)}</h4>
                                    <h5 className="off-div flex items-center ml-3 ">
                                        <span>TK{product.price}</span>
                                        <span>{product.discount}% off</span>
                                    </h5>
                                </div>
                                <h6>No Cost EMI</h6>


                                {/*<Variants/>*/}

                                <div className="">
                                    <div className="mt-5">
                                        <div className="description_key">
                                            <img style={{maxWidth: "20px"}} src={""} alt=""/>
                                        </div>
                                        <h5 className="description_key--value text-dark-600 dark:text-dark-50">1 Year
                                            Warranty for Mobile and 6 Months
                                            for Accessories Know More</h5>
                                    </div>
                                    <div className="mt-5">
                                        <div className="description_key">
                                            <h4 className="section_title">Highlights</h4>
                                        </div>
                                        <ul className="description_key--value highlights">
                                            {highlight?.map((h) => <li
                                                className="highlight_item text-dark-600 dark:text-dark-50">{h}</li>)}
                                        </ul>
                                    </div>
                                    <div className="mt-5">
                                        <div className="description_key">
                                            <h4 className="section_title">Seller</h4>
                                        </div>
                                        <ul className="description_value description_key--value">
                                            <li className="flex items-center">

                                                {sellerInfo && (
                                                    <div>
                                                        <div className="flex items-center">
                                                            <div
                                                                className="flex items-center bg-primary-600 text-white gap-x-1 px-2 py-1 rounded">
                                                                <span>{calculateRate()}</span>
                                                                <BiStar/>
                                                            </div>
                                                            <h5 className="heading-5">
                                                                <Link
                                                                    to={`/shop/${sellerInfo.shopName}`}>{sellerInfo.shopName}</Link>
                                                            </h5>

                                                        </div>
                                                        <div className="w-10 mt-2">
                                                            <img src={sellerInfo.shopLogo}/>
                                                        </div>
                                                    </div>
                                                )}

                                            </li>
                                            {productDescription.seller_rules && productDescription.seller_rules.map((rule) =>
                                                <li>{rule}</li>)}
                                        </ul>
                                    </div>

                                    <div className="mt-5">
                                        <div className="description_key">
                                            <h4 className="section_title">Description</h4>
                                        </div>
                                        <p className="p-theme">{productDescription.summary || `Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt.

                                                Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla quis lorem ut libero malesuada feugiat.

                                            Donec sollicitudin molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.`}</p>
                                    </div>
                                </div>

                                {/*<SpecificationDetail specification={productDescription?.specification}/>*/}
                                <RatingReviews productId={product._id}/>
                                <QuestionAnswers
                                    isProductOwner={auth?.role === "admin"}
                                    // isProductOwner={auth?._id === product?.sellerId}
                                    productId={product._id}/>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;