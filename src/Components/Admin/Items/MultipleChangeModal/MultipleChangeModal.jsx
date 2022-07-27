import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { Autocomplete } from '@mui/material'
import { MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { getBrands } from '../../../../Redux/brandsReducer'
import { getAllCategoriesForSelect } from '../../../../Redux/categoryReducer'
import { getItems, multipleChange } from '../../../../Redux/itemsReducer'
import { getTags } from '../../../../Redux/tagsReducer'
import useDebounce from '../../../../Utils/debounce'
import CustomSelect from '../../../UI/Form/Select'
import Modal from '../../../UI/Modal/Modal'
import classes from './MultipleChangeModal.module.css'

const useStyles = makeStyles((theme) => ({
    root:{
        background: "white",
        '& label.Mui-focused': {
            color: '#4B5EA3'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4B5EA3' 
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            borderRadius: "4px"
        },
        '& .MuiFormHelperText-root.Mui-error': {
            margin: 0,
            marginTop: 5,
        }
    }
}));

const MultipleChangeModal = (props) => {
    const { 
        onClose, 
        selectedItems,
        getBrands,
        getAllCategoriesForSelect,
        getTags,
        brands,
        tags,
        categories,
        multipleChange,
        pageNumber,
        pageSize,
        searchGlobalValue,
        getItems,
        setSelectedItems
    } = props

    const [type, setType] = useState("brand")
    const [value, setValue] = useState(null)

    const [searchValue, setSearchValue] = useState("")

    const debouncedSearchTerm = useDebounce(searchValue, 500);

    const [action, setAction] = useState("add")

    const material = useStyles()

    const onSubmit = () => {
        if(value) {
            multipleChange(selectedItems, type, value._id, action).then((status) => {
                if(status) {
                    getItems(pageNumber + 1, pageSize, "", "", searchGlobalValue, false)
                    setSelectedItems([])
                }
            })
        }
    }

    useEffect(() => {
        if(debouncedSearchTerm) {
            switch(type) {
                case "brand": {
                    getBrands(1, 1000, "", "", searchValue, false)
                    break
                }
                case "category": {
                    getAllCategoriesForSelect(1, 1000, "", "", searchValue, false)
                }
                case "tag": {
                    getTags(1, 1000, "", "", searchValue, false)
                }
            }
        }
    }, [debouncedSearchTerm, type])

    useEffect(() => {
        if(searchValue.length === 0) {
            switch(type) {
                case "brand": {
                    getBrands(1, 1000, "", "", "", false)
                    break
                }
                case "category": {
                    getAllCategoriesForSelect(1, 1000, "", "", "", false)
                }
                case "tag": {
                    getTags(1, 1000, "", "", "", false)
                }
            }
        }
    }, [searchValue, type])

    return (
        <Modal title="Мультизамена" onClose={onClose}>
            <div className={classes.main}>
                <div className={classes.type}>
                    <CustomSelect
                        onChange={e => setType(e.target.value)}
                        value={type}
                        label="Что заменить"
                    >
                        <MenuItem value={"brand"}>{"Бренд"}</MenuItem>
                        <MenuItem value={"category"}>{"Категорию"}</MenuItem>
                        <MenuItem value={"tag"}>{"Тэг"}</MenuItem>
                    </CustomSelect>
                </div>
                {type === "tag" && (
                    <div className={classes.type}>
                        <CustomSelect
                            onChange={e => setAction(e.target.value)}
                            value={action}
                            label="Действие"
                        >
                            <MenuItem value={"add"}>{"Добавить"}</MenuItem>
                            <MenuItem value={"remove"}>{"Удалить"}</MenuItem>
                        </CustomSelect>
                    </div>
                )}
                <div className={classes.values}>
                    <Autocomplete
                        disablePortal
                        options={
                            type === "brand" && brands ||
                            type === "category" && categories ||
                            type === "tag" && tags
                        }
                        value={value}
                        getOptionLabel={option => option.name_ua ? option.name_ua : option.name}
                        onChange={(e, newValue) => setValue(newValue)}
                        onClose={e => setSearchValue("")}
                        filterSelectedOptions
                        limitTags={100}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        style={{ width: "100%" }}
                        defaultValue={null}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                classes={material} 
                                label={
                                    type === "brand" && "Название бренда, на который нужно сменить" ||
                                    type === "category" && "Имя категории, на которую нужно сменить" ||
                                    type === "tag" && "Имя тега, на который нужно добавить / удалить"
                                }
                                onChange={e => setSearchValue(e.target.value)}     
                            />
                        )}
                />
                </div>
                <Button className={classes.submit} disabled={!value} onClick={onSubmit}>Заменить</Button>
            </div>
        </Modal>
    )
}

let mapStateToProps = (state) => ({
    brands: state.brands.brands,
    categories: state.categories.allCategories,
    tags: state.tags.tags,
})

export default connect(mapStateToProps, {
    multipleChange,
    getBrands,
    getTags,
    getAllCategoriesForSelect,
    getItems
})(MultipleChangeModal)