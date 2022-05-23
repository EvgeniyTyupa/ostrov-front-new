import React from 'react'
import classes from './SearchMobile.module.css'
import { FiSearch } from 'react-icons/fi';
import { IconButton } from '@mui/material';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Search from '../Search';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Preloader from '../../../../Preloader/Preloader';

const SearchMobile = (props) => {
    const { isFetching } = props

    const { t } = useTranslation()

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const anchor = 'top'

    return (
        <div>
            <IconButton className={classes.searchMobile} onClick={handleOpen}>
                <FiSearch/>
            </IconButton>
            <Drawer
                anchor={anchor} 
                open={isOpen} 
                onClose={handleOpen}
                classes={{ root: classes.root, paper: classes.paper }}
            >
                {isFetching && <Preloader/>}
                <div className={classes.header}>
                    <IconButton 
                        onClick={handleOpen}
                        className={classes.closeBut}
                    >
                        <AiOutlineClose/>
                    </IconButton>
                </div>
                <div className={classes.content}>
                    <h3>{t('common.search')}</h3>
                    <Search handleOpen={handleOpen}/>
                </div>
            </Drawer>
        </div>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {})(SearchMobile)