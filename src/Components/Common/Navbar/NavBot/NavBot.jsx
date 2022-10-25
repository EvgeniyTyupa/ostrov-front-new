import React, { useRef, useState } from 'react'
import MaxWidthContainer from '../../../UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../../UI/Container/PaddingContainer/PaddingContainer'
import classes from './NavBot.module.css'
import { RiFileListFill } from 'react-icons/ri';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cx } from '../../../../Utils/classnames';
import AnimatedBlock from '../../../Animation/AnimatedBlock/AnimatedBlock';
import CategoriesList from '../../CategoriesList/CategoriesList';
import { useOnClickOutside } from '../../../../Hooks/useOnClickOutside';
import useWindowDimensions from '../../../../Hooks/useWindowDimension';
import { Drawer } from '@mui/material';
import { IconButton } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import CategoriesListMobile from '../../CategoriesList/CategoriesListMobile/CategoriesListMobile';

const NavBot = (props) => {
    const { categories, setIsOpenMobileCatalog, isOpenMobileCatalog } = props

    const { t } = useTranslation()

    const location = useLocation()

    const catalogRef = useRef(null)

    const { width } = useWindowDimensions()

    const [isOpenCatalog, setIsOpenCatalog] = useState(false)

    useOnClickOutside(catalogRef, () => setIsOpenCatalog(false));

    const handleOpen = () => {
        if(width <= 1170) {
            handleMobileOpen(0)
        }
        if(location.pathname != "/"){
            setIsOpenCatalog(!isOpenCatalog)
        }
    }

    const handleMobileOpen = () => {
        setIsOpenMobileCatalog(!isOpenMobileCatalog)
    }

    const anchor = 'left'

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div ref={catalogRef} className={cx(classes.catalogContainer, location.pathname != "/" ? classes.handle : "")} onClick={handleOpen}>
                    <RiFileListFill/>
                    <p className={classes.catalogHeader}>КАТАЛОГ</p>
                    {isOpenCatalog &&
                        <AnimatedBlock
                            className={classes.catalogMenu}
                            initial={{ opacity: 0, x: -200 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            duration={1.3}
                            type={"spring"}
                        >
                            <CategoriesList categories={categories}/>
                        </AnimatedBlock>
                    }
                </div>
                <Drawer 
                    anchor={anchor} 
                    open={isOpenMobileCatalog} 
                    onClose={handleMobileOpen}
                    classes={{ root: classes.root, paper: classes.paper }}
                >
                    <div className={classes.header}>
                        <IconButton 
                            onClick={handleMobileOpen}
                            className={classes.closeBut}
                        >
                            <AiOutlineClose/>
                        </IconButton>
                    </div>
                    <CategoriesListMobile categories={categories} handleMobileOpen={handleMobileOpen}/>
                </Drawer>
                <div className={classes.links}>
                    <NavLink to="/#brands">{t("navigation.brands")}</NavLink>
                    <NavLink to="/actions">{t("navigation.actions")}</NavLink>
                    <NavLink to="/#selector">{t("navigation.byAge")}</NavLink>
                    <NavLink to="/#best">{t("navigation.best")}</NavLink>
                    <NavLink to="/blog">{t("navigation.blog")}</NavLink>
                    <NavLink to="/#news">{t("navigation.news")}</NavLink>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default NavBot