import { IconButton } from '@mui/material';
import React from 'react'
import Slider from "react-slick";
import classes from './Slider.module.css'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import useWindowDimensions from '../../../Hooks/useWindowDimension';

function SampleNextArrow(props) {
    const { className, style, onClick, type } = props;
    const { width } = useWindowDimensions()

    return (
        <div
            className={className}
            style={{ 
                ...style, 
                display: "block", 
                padding: 0,
                zIndex: 5,
                right: type === "items" ? 
                (width < 768 ? "4%" : 0) : (width < 768 ? "9%" : "5%"),
                top: (width < 768 && type === "items") ? "43%" : "48%"
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
    const { width } = useWindowDimensions()

    return (
        <div 
            className={className}
            style={{ 
                ...style, 
                display: "block", 
                padding: 0,
                zIndex: 5,
                left:  type === "items" ? "-20px" : "4%",
                top: (width < 768 && type === "items") ? "43%" : "48%"
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
        autoplay = false,
        vertical = false,
        verticalSwiping = false,
        type = "items",
        responsive = [
            {
                breakpoint: 1170,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1
                }
            },
            {
                breakpoint: 862,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
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
        className: classes.slider,
        responsive: responsive,
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