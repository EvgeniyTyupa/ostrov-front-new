import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getActions } from '../../Redux/actionsReducer'
import { getItems } from '../../Redux/itemsReducer'
import { getHgTags } from '../../Redux/tagsReducer'
import Home from './Home'

const HomeContainer = (props) => {
    const {
        categories,
        isFetching,
        getActions,
        actions,
        items,
        getItems,
        hgTags,
        getHgTags
    } = props

    console.log("asd", hgTags)

    useEffect(() => {
        getActions(1, 100, "", "", "", true)
        getItems(1, 15, "rating", -1, "")
        getHgTags()
    }, [])

    return (
        <>
            {isFetching ? <Preloader/> 
            :
                <Home 
                    categories={categories}
                    actions={actions}
                    items={items}
                    hgTags={hgTags}
                />
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    categories: state.categories.categories,
    isFetching: state.common.isFetching,
    actions: state.actions.actions,
    items: state.items.items,
    hgTags: state.tags.hgTags
})

export default connect(mapStateToProps, {
    getActions,
    getItems,
    getHgTags
})(HomeContainer)