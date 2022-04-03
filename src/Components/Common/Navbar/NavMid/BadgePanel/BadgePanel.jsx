import { Badge, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import classes from './BadgePanel.module.css'
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { styled } from '@mui/material/styles';
import AccountMenu from './AccountMenu/AccountMenu';
import { useTranslation } from 'react-i18next';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 7,
      backgroundColor: "#E86589 !important",
      padding: '0 4px',
    },
}));

const BadgePanel = (props) => {
    const { t } = useTranslation()

    return (
        <div className={classes.main}>
            <Tooltip title={t("common.likeTooltip")}>
                <IconButton>
                    <StyledBadge badgeContent={4} color="secondary">
                        <FiHeart/>
                    </StyledBadge>
                </IconButton>
            </Tooltip>
            <Tooltip title={t("common.cartTooltip")}>
                <IconButton>
                    <StyledBadge badgeContent={4} color="secondary">
                        <FiShoppingCart/>
                    </StyledBadge>
                </IconButton>
            </Tooltip>
            <AccountMenu/>
        </div>
    )
}

export default BadgePanel