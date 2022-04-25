import React from 'react'
import { connect } from 'react-redux'
import Preloader from '../../../Components/Common/Preloader/Preloader'
import Career from './Career'

const CareerContainer = (props) => {
    const {
        isFetching,
        currentLanguage
    } = props

    return (
        <>
            {isFetching && <Preloader/>}
            <Career
                currentLanguage={currentLanguage}
            />
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {

})(CareerContainer)