import React from "react"
import { connect } from "react-redux"
import Account from "./Account"

const AccountContainer = (props) => {
    const { user } = props

    return (
        <>
            <Account
                user={user}
            />
        </>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps, {

})(AccountContainer)