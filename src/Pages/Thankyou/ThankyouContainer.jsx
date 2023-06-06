import { useEffect } from "react"
import { useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import Preloader from "../../Components/Common/Preloader/Preloader"
import { checkPaymentHash } from "../../Redux/ordersReducer"
import Thankyou from "./Thankyou"

const ThankyouContainer = (props) => {
    const { isFetching, checkPaymentHash } = props

    const { paymentHash } = useParams()
    const navigate = useNavigate()

    const [checkResult, setCheckResult] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        checkPaymentHash(paymentHash).then(response => {
            if (response) {
                setCheckResult(true)
            } else {
                setCheckResult(false)
            }
            setIsChecked(true)
        })
    }, [paymentHash])

    useEffect(() => {
        if (isChecked && !checkResult) {
            navigate("/")
        }
    }, [isChecked, checkResult])

    return (
        <>
            {isFetching && <Preloader/>}
            {(isChecked && checkResult) && (
                <Thankyou/>
            )}
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {
    checkPaymentHash
})(ThankyouContainer)