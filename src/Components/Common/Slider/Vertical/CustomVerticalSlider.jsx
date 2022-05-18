import React, { Children } from 'react'
import Slider from 'react-slick'
import classes from './CustomVerticalSlider.module.css'
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { IconButton } from '@mui/material';
import useWindowDimensions from '../../../../Hooks/useWindowDimension';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    const { width } = useWindowDimensions()

    return (
        <div
            className={className}
            style={{ 
                ...style, 
                display: "block", 
                padding: 0,
                zIndex: 5,
                left: width > 862 ? "35%" : "25%",
                top: "97%"
            }}
        >
            <IconButton
                onClick={onClick}
                className={classes.slideBut}
            >
                <FiArrowDown/>
            </IconButton>
        </div>
    );
}
  
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    const { width } = useWindowDimensions()

    return (
        <div 
            className={className}
            style={{ 
                ...style, 
                display: "block", 
                padding: 0,
                zIndex: 5,
                left: width > 862 ? "35%" : "25%",
                top: "-10px"
            }}
        >
            <IconButton
                onClick={onClick}
                className={classes.slideBut}
            >
                <FiArrowUp/>
            </IconButton>
        </div>
    );
}

const CustomVerticalSlider = (props) => {
    const { 
        children,
        dots = false,
        infinite = true,
        speed = 500,
        slidesToShow = 1,
        slidesToScroll = 1,
        autoplay = true,
    } = props

    console.log(slidesToShow)

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
        vertical: true,
        verticalSwiping: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        className: classes.slider
    };

    return (
        <div className={classes.main}>
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    )
}

export default CustomVerticalSlider