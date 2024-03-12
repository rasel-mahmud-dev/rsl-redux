import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryHeroList from "./CategoryList/CategoryHeroList.jsx";

const HeroBanner = ({showCategories}) => {

    const items = [
        {image: "/ecfcb747-0e8c-4c16-a6a2-88b810351aeb.jpg_1200x1200.jpg"},
        {image: "/9eb05626-e415-4477-bc36-f01638fdaa39.jpg"},
        {image: "/5df944d0-800c-464a-a576-4fd16c37d076.jpg"},
        {image: "/a75a39bf-54c8-466b-b7a8-f04b8a4deeb0.jpg"},
        {image: "/a26d3c97-6da8-4699-af09-5ab28952c133.jpg"},
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    }

    return (
        <div className="mt-4 home-wrapper">
            <div className="sidebar-home">
                <CategoryHeroList categories={showCategories} />
            </div>

            <div className="w-full slider-root">
                <Slider {...settings}>
                    {items.map(item => (
                        <div className="slider-item">
                            <img src={item.image} alt=""/>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default HeroBanner;