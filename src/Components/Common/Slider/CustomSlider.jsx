import { IconButton } from '@mui/material';
import React from 'react'
import Slider from "react-slick";
import classes from './Slider.module.css'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

function SampleNextArrow(props) {
    const { className, style, onClick, type } = props;
    return (
        <div
            className={className}
            style={{ 
                ...style, 
                display: "block", 
                padding: 0,
                zIndex: 5,
                right: type === "items" ? 0 : "5%",
                top: "48%"
            }}
        >
            <IconButton
                onClick={onClick}
                className={classes.slideBut}
            >
                <FiArrowRight/>
            </IconButton>
        </div>
    );
}
  
function SamplePrevArrow(props) {
    const { className, style, onClick, type } = props;
    return (
        <div 
            className={className}
            style={{ 
                ...style, 
                display: "block", 
                padding: 0,
                zIndex: 5,
                left:  type === "items" ? "-20px" : "3%",
                top: "48%"
            }}
        >
            <IconButton
                onClick={onClick}
                className={classes.slideBut}
            >
                <FiArrowLeft/>
            </IconButton>
        </div>
    );
}

const CustomSlider = (props) => {
    const { 
        children,
        dots = false,
        infinite = true,
        speed = 500,
        slidesToShow = 1,
        slidesToScroll = 1,
        autoplay = true,
        vertical = false,
        verticalSwiping = false,
        type = "items"
    } = props

    const settings = {
        dots: dots,
        infinite: infinite,
        speed: speed,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        autoplay: autoplay,
        swipeToSlide: true,
        adaptiveHeight: true,
        arrows: true,
        draggable: true,
        vertical: vertical,
        verticalSwiping: verticalSwiping,
        nextArrow: <SampleNextArrow type={type}/>,
        prevArrow: <SamplePrevArrow type={type}/>,
        className: classes.slider
    };

    return(
        <div className={classes.main}>
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    )
}

export default CustomSlider