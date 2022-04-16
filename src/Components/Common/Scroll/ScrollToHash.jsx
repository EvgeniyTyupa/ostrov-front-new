import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";

const ScrollToHash = ({ isFetching, children }) => {
    const location = useLocation()
    
    useEffect(() => {
        const element = document.getElementById(location.hash.replace("#", ""));
        setTimeout(() => {
            window.scrollTo({
            behavior: "smooth",
            top: element ? element.offsetTop : 0
        })}, 100);
    }, [location, isFetching]);

    return children;
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, null)(ScrollToHash);