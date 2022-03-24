import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getItem } from '../../Redux/itemsReducer'
import Item from './Item'

const ItemContainer = (props) => {
    const {
        currentItem,
        isFetching,
        getItem
    } = props

    const { name } = useParams()

    console.log(currentItem)

    useEffect(() => {
        getItem(name)
    }, [])

    return (
        <>
            {isFetching ? <Preloader/> :
                <Item 
                    item={currentItem}
                />
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    currentItem: state.items.currentItem
})

export default connect(mapStateToProps, {
    getItem
})(ItemContainer)