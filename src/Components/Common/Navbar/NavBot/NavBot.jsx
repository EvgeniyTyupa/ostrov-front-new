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

const NavBot = (props) => {
    const { categories } = props

    const { t } = useTranslation()

    const location = useLocation()

    const catalogRef = useRef(null)

    const [isOpenCatalog, setIsOpenCatalog] = useState(false)

    useOnClickOutside(catalogRef, () => setIsOpenCatalog(false));

    const handleOpen = () => {
        if(location.pathname != "/"){
            setIsOpenCatalog(!isOpenCatalog)
        }
    }

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div ref={catalogRef} className={cx(classes.catalogContainer, location.pathname != "/" ? classes.handle : "")} onClick={handleOpen}>
                    <RiFileListFill/>
                    <p>КАТАЛОГ</p>
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