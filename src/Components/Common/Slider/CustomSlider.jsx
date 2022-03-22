import { IconButton } from '@mui/material';
import React from 'react'
import Slider from "react-slick";
import classes from './Slider.module.css'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <IconButton
            className={className}
            style={{ ...style, display: "block", padding: 0 }}
            onClick={onClick}
        >
            <BsFillArrowRightCircleFill/>
        </IconButton>
    );
}
  
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <IconButton
            className={className}
            style={{ ...style, display: "block", padding: 0 }}
            onClick={onClick}
        >
            <BsFillArrowLeftCircleFill/>
        </IconButton>
    );
}

const CustomSlider = (props) => {
    const { 
        children,
        dots = true,
        infinite = true,
        speed = 500,
        slidesToShow = 1,
        slidesToScroll = 1,
        autoplay = true,
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
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
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