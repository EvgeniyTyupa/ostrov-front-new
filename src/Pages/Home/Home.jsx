import React from 'react'
import { useTranslation } from 'react-i18next'
import CategoriesList from '../../Components/Common/CategoriesList/CategoriesList'
import InstaBlock from '../../Components/Common/InstaBlock/InstaBlock'
import HgTags from '../../Components/Common/Items/HgTags/HgTags'
import NewsList from '../../Components/Common/News/NewsList'
import SmallItemsList from '../../Components/Common/Items/SmallItemsList/SmallItemsList'
import CustomSlider from '../../Components/Common/Slider/CustomSlider'
import ToySelector from '../../Components/Common/ToySelector/ToySelector'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'
import classes from './Home.module.css'

const Home = (props) => {
    const { 
        categories,
        actions,
        items,
        news,
        hgTags
    } = props

    const { t } = useTranslation()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.top}>
                    <CategoriesList categories={categories}/>
                    <div className={classes.actionSlider}>
                        <CustomSlider>
                            {actions.map(item => (
                                <img 
                                    src={item.image} 
                                    alt="action" 
                                    key={item._id}
                                    className={classes.actionImg}
                                />
                            ))}
                        </CustomSlider>
                    </div>
                </div>
                <div className={classes.popular}>
                    <SmallItemsList 
                        items={items} 
                        title={t("items.itemsListTitle")} 
                        href="/items?filter=popular"
                        slidesToShow={items.length > 4 ? 5 : items.length}
                    />
                </div>
                <div className={classes.tags}>
                    <HgTags tags={hgTags}/>
                </div>
                <div className={classes.selector}>
                    <ToySelector/>
                </div>
                <div className={classes.insta}>
                    <InstaBlock/>
                </div>
                <div className={classes.news}>
                    <NewsList 
                        items={news}
                        title={t("navigation.news")}
                        href="/blog"
                        slidesToShow={news.length > 3 ? 4 : news.length}
                    />
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Home