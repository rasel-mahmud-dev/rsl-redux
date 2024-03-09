import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import getAssetPath from "../../utils/getAssetPath.js";
import {FaAngleDown} from "react-icons/fa";
import {BiStar} from "react-icons/bi";
import {api} from "../../axios/index.js";

import "./ProductDetail.scss"
import RatingReviews from "./RatingReviews.jsx";
import QuestionAnswers from "./QuestionAnswers.jsx";
import {useDispatch, useSelector} from "rsl-redux";
import Toast from "../../utils/toast.js";
import {addToCartAction, deleteCartItemAction} from "../../store/actions/cartAction.js";
import toast from "../../utils/toast.js";

function calculateDiscount(discount, price) {
    let offPrice = ((discount / 100) * price)
    return price - offPrice
}

const ProductDetail = () => {

    const {slug} = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const {auth} = useSelector(state => state.authState)
    const {carts} = useSelector(state => state.cartState)

    const [isShowImage, setShowImage] = React.useState(0);
    const [product, setProduct] = React.useState(null);
    const [productDescription, setProductDescription] = React.useState({});
    const [sellerInfo, setSellerInfo] = React.useState({});
    const productImageListRef = React.useRef(null);

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

    function handleAddToCart({title, price, _id, coverImage}) {
        if (!auth) {
            return Toast.openError("Need to login for add item in cart.")
        }
        const cart = inCart(_id)
        if (cart?._id) {
            dispatch(deleteCartItemAction(cart._id)).unwrap().then(() => {
                Toast.openSuccess("Successfully removed from cart")
            }).catch(msg => {
                toast.openError(msg)
            })
        } else {
            dispatch(addToCartAction({
                title,
                price,
                productId: _id,
                coverImage,
                quantity: 1
            })).unwrap().then(() => {
                Toast.openSuccess("Successfully added on the cart")
            })
        }
    }


    useEffect(() => {
        if (!slug) return;
        api.get("/products/single?slug=" + slug).then(r => {
            if (r.data) {
                setProduct(r.data);
            }
        })
    }, [slug]);

    function inCart(productId) {
        return carts?.find(el => el.productId === productId)
    }

    function goCheckout() {
        localStorage.setItem("selected-products-for-checkout", JSON.stringify({
            title: product.title,
            price: product.price,
            productId: product._id,
            coverImage: product.coverImage,
            quantity: 1,
            createdAt: new Date()
        }))
        navigate("/checkout?t=product", {state: location.pathname})
    }

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
                                        <div className="text-center font-semibold">
                                            {product.stock > 0
                                                ? `${product.stock} items in Stock`
                                                : "Outof Stock" }

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

                                    <div className="mt-5 flex gap-x-2 w-full">
                                        <button
                                            className="btn primary-btn w-full"
                                            onClick={() => handleAddToCart(product)}>
                                            {inCart(product._id) ? "Remove from Cart" : "Add To Cart"}
                                        </button>
                                        <button onClick={goCheckout} className="btn primary-btn w-full">Buy Now</button>
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
                                            <h4 className="sec_label font-semibold text-2xl mb-3">Description</h4>
                                        </div>
                                        <p className="p-theme">{product.description}</p>
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