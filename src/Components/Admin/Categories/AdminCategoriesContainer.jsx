import { connect } from "react-redux"
import Preloader from "../../Common/Preloader/Preloader"
import AdminCategories from "./AdminCategories"
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'

const AdminCategoriesContainer = (props) => {
    const {
        isFetching
    } = props

    return (
        <AdminLayout>
            {isFetching && <Preloader/>}
            <AdminCategories/>
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    categories: state.categories.categories
})

export default connect(mapStateToProps, {

})(AdminCategoriesContainer)