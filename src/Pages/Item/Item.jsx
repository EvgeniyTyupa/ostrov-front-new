import { Button, IconButton, Tooltip } from '@mui/material'
import { t } from 'i18next'
import React from 'react'
import { Rating } from 'react-simple-star-rating'
import Breadcrumbs from '../../Components/Common/Breadcrumbs/Breadcrumbs'
import CustomVerticalSlider from '../../Components/Common/Slider/Vertical/CustomVerticalSlider'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'
import { cx } from '../../Utils/classnames'
import classes from './Item.module.css'
import { FiHeart } from 'react-icons/fi';
import SmallItemsList from '../../Components/Common/Items/SmallItemsList/SmallItemsList'
import CommentForm from '../../Components/Common/Items/Comments/CommentForm/CommentForm'
import Comment from '../../Components/Common/Items/Comments/Comment/Comment'
import { priceParser } from '../../Utils/priceParser'
import { discountParser } from '../../Utils/discountParser'
import NeedAuthModal from '../../Components/Modals/NeedAuthModal/NeedAuthModal'

const Item = (props) => {
    const {
        item,
        currentLanguage,
        categoriesWithParents,
        currentImage,
        setCurrentImage,
        isFullDesc,
        handleFullText,
        sameItems,
        comments,
        totalComments,
        discount,
        handleLike,
        user,
        isOpenNeedAuthModal,
        handleOpenAuthModal,
        isLiked
    } = props

    let currentItemName = currentLanguage === "ru" ? item.name : item.name_ua
    
    let breadcrumbsItems = categoriesWithParents.map(el => {
        return {
            href: `/catalog?pageNumber=1&pageSize=25&searchBy=category&from=asc&searchValue=${el._id}`,
            title: currentLanguage === "ru" ? el.name : el.name_ua
        }
    })

    const description = currentLanguage === "ru" ? item.description : item.description_ua

    const rating = item.rating * 20

    let price = priceParser(item.price)

    return (
        <div className={classes.mainContainer}>
            {isOpenNeedAuthModal && <NeedAuthModal onClose={handleOpenAuthModal}/>}
            <PaddingContainer className={classes.main}>
                <MaxWidthContainer className={classes.container}>
                    <Breadcrumbs items={breadcrumbsItems} active={currentItemName}/>
                    <h2 className={classes.itemName}>{currentLanguage === "ru" ? item.name : item.name_ua}</h2>
                    <div className={classes.content}>
                        <div className={classes.images}>
                            <div className={classes.slider}>
                                <CustomVerticalSlider slidesToShow={item.images.length > 3 ? 4 : item.images.length} vertical={true}>
                                    {item.images.map(el => (
                                        <img 
                                            src={el} 
                                            key={el}
                                            alt="small image" 
                                            className={cx(classes.smallImage, el === currentImage ? classes.activeImg : undefined)}
                                            onClick={() => setCurrentImage(el)}
                                        />
                                    ))}
                                </CustomVerticalSlider>
                            </div>
                            <img src={currentImage} alt={item.name} className={classes.currentImage}/>
                        </div>
                        <div className={classes.info}>
                            <div className={classes.ratingCodeBlock}>
                                <Rating size={"22px"} ratingValue={rating} allowHalfIcon readonly/>
                                <span>{t("items.code")} {item.code}</span>
                            </div>
                            <div className={classes.priceBlock}>
                                {(item.in_action && item.from_sum_in_bill === 0 && !item.from_items_count) && 
                                    <p className={classes.discount}>{discount} грн.</p>
                                }
                                <p className={cx(classes.price, (item.in_action && (item.from_sum_in_bill === 0 && !item.from_items_count)) ? classes.inAction : undefined)}>{price} грн.</p>
                            </div>
                            <div className={classes.actionBlock}>
                                <Button
                                    className={classes.buyBut}
                                >
                                    {t("actions.buy")}
                                </Button>
                                <Tooltip title={!isLiked ? t("actions.like") : t('actions.unlike')}>
                                    <IconButton 
                                        onClick={handleLike} 
                                        className={cx(user ? (isLiked ? classes.unlikeBut : classes.likeBut) : classes.likeBut)}
                                    >
                                        <FiHeart/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className={classes.delivery}>
                                <p className={classes.deliveryTitle}>ДОСТАВКА</p>
                                <div className={classes.deliveryPoints}>
                                    <div className={classes.deliveryPoint}>
                                        <h4>{t("items.delivery.type1.label")}</h4>
                                        <p>{t("items.delivery.type1.value")}</p>
                                    </div>
                                    <div className={classes.deliveryPoint}>
                                        <h4>{t("items.delivery.type2.label")}</h4>
                                        <p>{t("items.delivery.type2.value")}</p>
                                    </div>
                                    <div className={classes.deliveryPoint}>
                                        <h4>{t("items.delivery.type3.label")}</h4>
                                        <p>{t("items.delivery.type3.value")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.modalButtons}>
                                <button>ОПЛАТА</button>
                                <button>{t("navigation.footer.guarantee")}</button>
                            </div>
                        </div>
                    </div>
                </MaxWidthContainer>
            </PaddingContainer>
            <PaddingContainer className={classes.descriptionBlock}>
                <MaxWidthContainer className={classes.descriptionContainer}>
                    <div className={classes.leftDescription}>
                        <h4>{t("items.description")}</h4>
                        <div className={cx(classes.descText, isFullDesc ? classes.fullDescText : undefined)}>
                            {description.length > 0 ? description.split("\n").map(el => (
                                <p key={el}>{el}</p>
                            )) : <p>{t("items.emptyDesc")}</p>}
                        </div>
                        {!isFullDesc && <div className={classes.hidingBlock}></div>}
                        {description.length > 0 && <button onClick={handleFullText}>
                            {isFullDesc ? t("items.hide") : t("items.details")}
                        </button>}
                    </div>
                    <div className={classes.rightDescription}>
                        <h4>ХАРАКТЕРИСТИКИ</h4>
                        <div className={classes.infoContainer}>
                            {item.country &&
                                <div className={classes.infoPoint}>
                                    <p>{t("items.info.country")}</p>
                                    <p>{currentLanguage === "ru" ? item.country : item.country_ua}</p>
                                </div>
                            }
                            <div className={classes.infoPoint}>
                                <p>{t("items.info.age")}</p>
                                <p>
                                    {item.min_age} - {item.max_age} {currentLanguage === "ru" ? "лет" : "роки"}
                                </p>
                            </div>
                            <div className={classes.infoPoint}>
                                <p>{t("items.info.gender")}</p>
                                <p>
                                    {item.gender === "all" && (currentLanguage === "ru" ? "Для всех" : "Для всіх")}
                                    {item.gender === "male" && (currentLanguage === "ru" ? "Для мальчиков" : "Для хлопчиків")}
                                    {item.gender === "female" && (currentLanguage === "ru" ? "Для девочек" : "Для дівчаток")}
                                </p>
                            </div>
                            {item.material && 
                                <div className={classes.infoPoint}>
                                    <p>{t("items.info.material")}</p>
                                    <p>{currentLanguage === "ru" ? item.material : item.material_ua}</p>
                                </div>
                            }
                            {item.size && 
                                <div className={classes.infoPoint}>
                                    <p>{t("items.info.size")}</p>
                                    <p>{item.size}см</p>
                                </div>
                            }
                        </div>
                    </div>
                </MaxWidthContainer>
            </PaddingContainer>
            <PaddingContainer>
                <MaxWidthContainer>
                    {sameItems.length > 0 &&
                        <div className={classes.same}>
                            <SmallItemsList
                                href="/"
                                title={t("items.sameItemsTitle")}
                                items={sameItems}
                                slidesToShow={sameItems.length > 4 ? 5 : sameItems.length}
                            />
                        </div>
                    }
                    <div className={classes.comments}>
                        <div className={classes.commentsHeader}>
                            <h4>{t("items.reviews.title")}</h4>
                            <span>{totalComments}</span>
                        </div>
                        <div className={classes.reviews}>
                            {comments.length > 0 ? comments.map(el => (
                                <Comment item={el} key={el._id}/>
                            )) : 
                                <div className={classes.emptyReview}>
                                   <p>{t("items.reviews.empty")}</p> 
                                </div>
                            }
                            <div className={classes.form}>
                                <CommentForm/>
                            </div>
                        </div>
                    </div>
                </MaxWidthContainer>
            </PaddingContainer>
        </div>
    )
}

export default Item