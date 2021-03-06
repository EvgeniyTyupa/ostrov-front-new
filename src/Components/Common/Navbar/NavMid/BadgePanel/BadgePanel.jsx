import { Badge, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import classes from './BadgePanel.module.css'
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { styled } from '@mui/material/styles';
import AccountMenu from './AccountMenu/AccountMenu';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ShoppingCartModal from '../../../ShoppingCart/ShoppingCartModal/ShoppingCartModal';
import Burger from '../../Burger/Burger';
import SearchMobile from '../Search/SearchMobile/SearchMobile';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 7,
      backgroundColor: "#E86589 !important",
      padding: '0 4px',
    },
}));

const BadgePanel = (props) => {
    const { isAuth, user, totalItemsCart, setIsOpenMobileCatalog, isOpenMobileCatalog } = props

    const { t } = useTranslation()

    const navigate = useNavigate()

    const onClickLike = () => {
        navigate(`/profile/liked_items`)
    }

    const onClickCart = () => {
        if(totalItemsCart){
            navigate(`/shopping_cart`)
        }
    }

    return (
        <div className={classes.main}>
            <div className={classes.searchMobile}>
                <SearchMobile/>
            </div>
            {(isAuth && user) &&
                <Tooltip title={t("common.likeTooltip")}>
                    <IconButton onClick={onClickLike}>
                        <StyledBadge badgeContent={user.liked_items.length} color="secondary">
                            <FiHeart/>
                        </StyledBadge>
                    </IconButton>
                </Tooltip>
            }
            <Tooltip 
                title={<ShoppingCartModal/>}
                classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
                arrow
            >
                <IconButton
                    onClick={onClickCart}
                >
                    <StyledBadge badgeContent={totalItemsCart} color="secondary">
                        <FiShoppingCart/>
                    </StyledBadge>
                </IconButton>
            </Tooltip>
            <AccountMenu/>
            <div className={classes.burger}>
                <Burger setIsOpenMobileCatalog={setIsOpenMobileCatalog} isOpenMobileCatalog={isOpenMobileCatalog}/>
            </div>
        </div>
    )
}

export default BadgePanel