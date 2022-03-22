import React from 'react'
import CategoriesList from '../../Components/Common/CategoriesList/CategoriesList'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'
import classes from './Home.module.css'

const Home = (props) => {
    const { 
        categories
    } = props

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.top}>
                    <CategoriesList categories={categories}/>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Home