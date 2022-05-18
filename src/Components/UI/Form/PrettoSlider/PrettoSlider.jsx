import React from 'react'
import Slider from '@mui/material/Slider';
import styled from '@emotion/styled';

const PrettoSlider = styled(Slider)({
    color: '#9DC8CF',
    height: 3,
    width: "100%",
    margin: "auto",
    "@media screen and (max-width: 468px)": {
      width: "97%"
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#E86589',
      border: '6px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#9DC8CF',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
});

const CustomPrettoSlider = (props) => {
    const {
        value,
        onChange,
        max
    } = props

    return (
        <PrettoSlider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={onChange}
            valueLabelDisplay="auto"
            max={max}
        />
    )
}

export default CustomPrettoSlider