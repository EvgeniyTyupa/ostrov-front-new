import React from 'react'
import CategoriesList from '../../Components/Common/CategoriesList/CategoriesList'
import CustomSlider from '../../Components/Common/Slider/CustomSlider'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'
import classes from './Home.module.css'

const Home = (props) => {
    const { 
        categories,
        actions
    } = props

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.top}>
                    <CategoriesList categories={categories}/>
                    <div className={classes.actionSlider}>
                        <CustomSlider>
                            {actions.map(item => (
                                <img 
                                    src={item.image} 
                                    alt="action" 
                                    className={classes.actionImg}
                                />
                            ))}
                        </CustomSlider>
                    </div>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Home