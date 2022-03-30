import React from 'react'
import classes from './Catalog.module.css'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'

const Catalog = (props) => {
    return (
        <PaddingContainer>
            <MaxWidthContainer>
                catalog
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Catalog