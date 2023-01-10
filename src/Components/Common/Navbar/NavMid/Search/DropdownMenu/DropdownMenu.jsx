import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { cx } from '../../../../../../Utils/classnames'
import classes from './DropdownMenu.module.css'
import DropdownMenuItem from './DropdownMenuItem/DropdownMenuItem'
import DropdownMenuOther from './DropdownMenuOther/DropdownMenuOther'

const DropdownMenu = (props) => {
    const { 
        items, 
        brands,
        categories,
        tags,
        active, 
        currentLanguage,
        total,
        searchValue,
        handleOpen
    } = props

    const { t } = useTranslation()

    const onClick = (e) => {
        e.preventDefault()
    }

    return (
        <div 
            className={
                cx(
                    classes.main, 
                    active ? classes.active : undefined, 
                    ((items.length > 0 ||
                     brands.length > 0 ||
                     tags.length > 0 ||
                     categories.length > 0
                    ) && active) ? classes.filled : undefined,
                )
            }
            onClick={onClick}
        >
            <div className={classes.container}>
                {(brands.length > 0 || categories.length > 0 || tags.length > 0) &&
                    <div className={classes.other}>
                        {tags.length > 0 &&
                            <div className={classes.block}>
                                <h5>Тематика</h5>
                                <div className={classes.otherItems}>
                                    {tags.map(el => (
                                        <DropdownMenuOther 
                                            key={el._id} 
                                            item={el}
                                            type={"tags"}
                                            currentLanguage={currentLanguage}
                                        />
                                    ))}
                                </div>
                            </div>
                        }
                        {brands.length > 0 &&
                            <div className={classes.block}>
                                <h5>{t("catalog.search.brands")}</h5>
                                <div className={classes.otherItems}>
                                    {brands.map(el => (
                                        <DropdownMenuOther 
                                            key={el._id} 
                                            item={el}
                                            type={"brand"}
                                            currentLanguage={currentLanguage}
                                        />
                                    ))}
                                </div>
                            </div>
                        }
                        {categories.length > 0 &&
                            <div className={classes.block}>
                                <h5>{t("catalog.search.categories")}</h5>
                                <div className={classes.otherItems}>
                                    {categories.map(el => (
                                        <DropdownMenuOther 
                                            key={el._id} 
                                            item={el}
                                            type={"category"}
                                            currentLanguage={currentLanguage}
                                        />
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                }
                {items.length > 0 &&
                    <div className={cx(classes.items, (brands.length === 0 && tags.length === 0 && categories.length === 0) ? classes.onlyItems : undefined)}>
                        <h5>{t("catalog.search.items")}</h5>
                        {items.map((el, index) => (
                            <DropdownMenuItem
                                key={el._id}
                                item={el}
                                currentLanguage={currentLanguage}
                                isLast={index === items.length - 1}
                                handleOpen={handleOpen}
                            />
                        ))}
                    </div>    
                }
            </div>
            {(items.length === 0 && 
              brands.length === 0 &&
              categories.length === 0 &&
              tags.length === 0  
            ) ?
                <p className={classes.empty}>{t("catalog.empty")}...</p>
            :
                (total > items.length && <NavLink to={`/catalog?pageNumber=1&pageSize=25&searchBy=name&from=asc&searchValue=${searchValue}`}>{t("catalog.search.more")}</NavLink>)
            }
        </div>
    )
}

export default DropdownMenu