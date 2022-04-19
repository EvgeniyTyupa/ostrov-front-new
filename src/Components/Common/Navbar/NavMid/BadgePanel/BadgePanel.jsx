import { Badge, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import classes from './BadgePanel.module.css'
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { styled } from '@mui/material/styles';
import AccountMenu from './AccountMenu/AccountMenu';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ShoppingCartModal from '../../../ShoppingCart/ShoppingCartModal/ShoppingCartModal';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 7,
      backgroundColor: "#E86589 !important",
      padding: '0 4px',
    },
}));

const BadgePanel = (props) => {
    const { isAuth, user, totalItemsCart } = props

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
        </div>
    )
}

export default BadgePanel