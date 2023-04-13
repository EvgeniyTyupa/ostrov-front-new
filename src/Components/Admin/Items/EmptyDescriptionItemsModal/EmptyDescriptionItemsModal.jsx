import { Button } from "@mui/material"
import { connect } from "react-redux"
import { setItemsWithEmptyDescription } from "../../../../Redux/itemsReducer"
import Modal from "../../../UI/Modal/Modal"
import classes from "./EmptyDescriptionItemsModal.module.css"

const EmptyDescriptionItemsModal = (props) => {
    const {
        itemsWithEmptyDescription,
        setItemsWithEmptyDescription,
        getItemsXml,
        onEditItemClick,
        uploadType
    } = props

    const handleClose = () => {
        setItemsWithEmptyDescription([])
    }

    return (
        <Modal title={`${uploadType} Каталог`} onClose={handleClose}>
            <div className={classes.main}>
                <div className={classes.header}>
                    <p>
                        У некоторых товаров отсутствует описание. Вы можете
                        отредактировать их сейчас, нажав на их название, или
                        пропустить этот шаг.
                    </p>
                    <p>
                        <strong>Внимание:</strong> товары, у которых нет
                        описания - не попадут в каталог {uploadType}.
                    </p>
                </div>
                <Button
                    className={classes.skipButt}
                    onClick={() => getItemsXml(true)}
                >
                    Пропустить
                </Button>
                <div className={classes.values}>
                    <label>Товары ({itemsWithEmptyDescription.length} шт.):</label>
                    {itemsWithEmptyDescription.map((el) => (
                        <Button key={el._id} onClick={() => onEditItemClick(el)}>
                            {el.name_ua}
                        </Button>
                    ))}
                </div>
            </div>
        </Modal>
    )
}

let mapStateToProps = (state) => ({
    itemsWithEmptyDescription: state.items.itemsWithEmptyDescription
})

export default connect(mapStateToProps, {
    setItemsWithEmptyDescription
})(EmptyDescriptionItemsModal)
