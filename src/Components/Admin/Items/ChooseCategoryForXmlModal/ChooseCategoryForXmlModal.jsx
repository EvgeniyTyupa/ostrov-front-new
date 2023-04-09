import { TextField } from "@mui/material"
import { Button } from "@mui/material"
import { Autocomplete } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { getAllCategoriesForSelect } from "../../../../Redux/categoryReducer"
import Modal from "../../../UI/Modal/Modal"
import classes from "./ChooseCategoryForXmlModal.module.css"

const useStyles = makeStyles((theme) => ({
    root: {
        background: "white",
        "& label.Mui-focused": {
            color: "#4B5EA3"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
                borderColor: "#4B5EA3"
            },
        "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            borderRadius: "4px"
        },
        "& .MuiFormHelperText-root.Mui-error": {
            margin: 0,
            marginTop: 5
        }
    }
}))

const ChooseCategoryForXmlModal = (props) => {
    const {
        onClose,
        categories,
        getAllCategoriesForSelect,
        getItemsXml,
        setCategoryIdForXml
    } = props

    const material = useStyles()

    const [value, setValue] = useState({ _id: "all", name_ua: "Все категории" })
    const [editedCategories, setEditedCategories] = useState([])

    const handleClose = () => {
        onClose()
        setCategoryIdForXml("all")
    }

    const makeXmlRequest = () => {
        onClose()
        getItemsXml(false)
    }

    const handleValue = (value) => {
        setValue(value)
        setCategoryIdForXml(value._id)
    }

    useEffect(() => {
        getAllCategoriesForSelect(1, 1000, "", "", "", false)
    }, [])

    useEffect(() => {
        if (categories) {
            setEditedCategories([{ _id: "all", name_ua: "Все категории" }, ...categories])
        }
    }, [categories])

    return (
        <Modal
            onClose={handleClose}
            title="Выберите категорию товаров, из которой вы хотите выгрузить XML"
        >
            <div className={classes.main}>
                <div className={classes.values}>
                    <Autocomplete
                        disablePortal
                        options={editedCategories}
                        value={value}
                        getOptionLabel={(option) => option.name_ua}
                        onChange={((e, value) => handleValue(value))}
                        filterSelectedOptions
                        limitTags={1000}
                        isOptionEqualToValue={(option, value) =>
                            option._id === value._id
                        }
                        style={{ width: "100%" }}
                        defaultValue={null}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                classes={material}
                                label={"Имя категории"}
                            />
                        )}
                    />
                </div>
                <Button onClick={makeXmlRequest} className={classes.continueButt}>Продолжить</Button>
            </div>
        </Modal>
    )
}

let mapStateToProps = (state) => ({
    categories: state.categories.allCategories
})

export default connect(mapStateToProps, {
    getAllCategoriesForSelect
})(ChooseCategoryForXmlModal)
