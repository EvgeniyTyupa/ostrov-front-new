import React from "react"
import { connect } from "react-redux"
import Preloader from "../../Common/Preloader/Preloader"
import Account from "./Account"

const AccountContainer = (props) => {
    const { user, isFetching } = props

    return (
        <>
            {isFetching && <Preloader/>}
            <Account
                user={user}
            />
        </>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {

})(AccountContainer)