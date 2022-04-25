import React from 'react'
import classes from '../AdminView.module.css'
import AdminSearch from '../../UI/Admin/Table/Search/AdminSearch'
import { Button, Tab, Tabs } from '@mui/material'
import ServerResponse from '../../UI/ServerResponse/ServerResponse';
import AdminAddAction from './AdminAddAction';
import AdminDeleteModal from '../../UI/Admin/AdminDeleteModal/AdminDeleteModal';
import AdminEditAction from './AdminEditAction';
import AdminActionsTable from './AdminActionsTable';
import { makeStyles } from '@mui/styles';
import AdminPromocodesTable from './Promocode/AdminPromocodesTable';
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock';

const useTabStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTab-textColorPrimary': {
            color: "white",
            textTransform: "initial",
            fontSize: "16px",
            fontWeight: "700",
            fontFamily: "Montserrat",
            textTransform: "uppercase",
            transitionDuration: ".3s",
            color: "rgba(75, 94, 163, .5)"
        },
        '& .Mui-selected': {
            opacity: 1,
            color: "#4B5EA3 !important",
        },
        '& .MuiTabs-indicator': {
            backgroundColor: "transpa",
            height: "0px"
        }
    }
}));

const AdminActions = (props) => {
    const {
        getActions,
        setSearchValue,
        searchValue,
        handleAddModal,
        actions,
        pageSize,
        pageNumber,
        handleChangePage,
        handlePageSize,
        handleRemove,
        handleEdit,
        total,
        isActual,
        handleIsActual,
        isOpenAddModal,
        getItems,
        items,
        categories,
        brands,
        tags,
        getAllCategoriesForSelect,
        getBrands,
        getTags,
        serverError,
        serverResponse,
        addAction,
        editAction,
        deleteAction,
        openRemove,
        openEdit,
        currentItem,
        currentTab,
        handleTab,
        getPromocodes,
        isOpenAddPromocode,
        handleAddPromocodeModal,
        handleAddPromocode
    } = props

    const rows = [
        {
            key: "title",
            text: "Заголовок",
            searchByValue: "title"
        },
        {
            key: "start",
            text: "Старт",
            searchByValue: "start"
        },
        {
            key: "end",
            text: "Конец",
            searchByValue: "end"
        },
        {
            key: 'last',
            text: "",
            searchByValue: ""
        }
    ]

    const material = useTabStyles()

    return (
        <AnimatedBlock className={classes.main}>
            {(serverResponse || serverError) && <ServerResponse/>}
            {isOpenAddModal && 
                <AdminAddAction
                    onClose={handleAddModal}
                    getItems={getItems}
                    items={items}
                    categories={categories}
                    brands={brands}
                    tags={tags}
                    getCategories={getAllCategoriesForSelect}
                    getBrands={getBrands}
                    getTags={getTags}
                    addAction={addAction}
                />
            }
            {openEdit &&
                <AdminEditAction
                    onClose={handleEdit}
                    getItems={getItems}
                    items={items}
                    categories={categories}
                    brands={brands}
                    tags={tags}
                    getCategories={getAllCategoriesForSelect}
                    getBrands={getBrands}
                    getTags={getTags}
                    editAction={editAction}
                    item={currentItem}
                />
            }
            {openRemove &&
                <AdminDeleteModal
                    onRemove={handleRemove}
                    item={currentItem}
                    deleteItem={deleteAction}
                    onClose={handleRemove}
                />
            }
            <div className={classes.header}>
                <h2>Акции</h2>
                <div className={classes.topController}>
                    <AdminSearch filter={isActual} onSearch={currentTab === 0 ? getActions : getPromocodes} pageSize={pageSize} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    <Button onClick={currentTab === 0 ? handleAddModal : handleAddPromocodeModal} className={classes.addBut}>Добавить +</Button>
                </div>
            </div>
            <div className={classes.tabs}>
                <Tabs
                    value={currentTab} 
                    onChange={handleTab}
                    classes={material}
                >
                    <Tab value={0} label="Акции"/>
                    <Tab value={1} label="Промокоды"/>
                </Tabs>
                <div className={classes.tabContent}>
                    {currentTab === 0 && (
                        <AdminActionsTable
                            isActual={isActual}
                            rows={rows}
                            getActions={getActions}
                            searchValue={searchValue}
                            pageNumber={pageNumber}
                            pageSize={pageSize}
                            actions={actions}
                            handleRemove={handleRemove}
                            handleEdit={handleEdit}
                            handleIsActual={handleIsActual}
                            handleChangePage={handleChangePage}
                            handlePageSize={handlePageSize}
                            total={total}
                        />
                    )}
                    {currentTab === 1 && (
                        <AdminPromocodesTable
                            searchValue={searchValue}
                            isOpenAddPromocode={isOpenAddPromocode}
                            handleAddPromocodeModal={handleAddPromocodeModal}
                            pageNumber={pageNumber}
                            pageSize={pageSize}
                            handleChangePage={handleChangePage}
                            handlePageSize={handlePageSize}
                            handleAddPromocode={handleAddPromocode}
                        />
                    )}
                </div>
            </div>
        </AnimatedBlock>
    )
} 

export default AdminActions