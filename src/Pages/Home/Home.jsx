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
import BrandItem from '../../Components/Common/Brands/BrandItem'
import sun_img from '../../Assets/sun.svg'
import MainSlide from '../../Components/Common/MainSlide/MainSlide'
import AnimatedBlock from '../../Components/Animation/AnimatedBlock/AnimatedBlock'
import { Helmet } from 'react-helmet'
import useWindowDimensions from '../../Hooks/useWindowDimension'

const Home = (props) => {
    const { 
        categories,
        slides,
        items,
        news,
        brands,
        hgTags,
        tags,
        currentLanguage,
    } = props

    const { t } = useTranslation()

    const { width } = useWindowDimensions()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer>
                <Helmet 
                    htmlAttributes={{"lang": "ua", "amp": undefined}}
                    title={`${t("siteName")} | ${currentLanguage === "ru" ? "Главная" : "Головна"}`}
                    meta={[{"name": "description", "content": t("siteDescription")}]}
                />
                <AnimatedBlock 
                    className={classes.container}
                    initial={{opacity: 0, y: -200, transition: { duration: 1 } }}
                    exit={{ opacity: 0 }}
                >
                    <div className={classes.top}>
                        <div className={classes.catList}>
                            <CategoriesList categories={categories}/>
                        </div>
                        <div className={classes.actionSlider}>
                            <CustomSlider 
                                type="action"
                                responsive={[
                                    {
                                      breakpoint: 1920,
                                      settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                      }
                                    }
                                ]}
                            >
                                {slides.map(item => (
                                    <MainSlide item={item} key={item._id} currentLanguage={currentLanguage}/>
                                ))}
                            </CustomSlider>
                        </div>
                    </div>
                    <div className={classes.popular} id="best">
                        <SmallItemsList 
                            items={items} 
                            title={t("items.itemsListTitle")} 
                            href={`/catalog?pageNumber=1&pageSize=25&searchBy=popular&from=asc`}
                            slidesToShow={
                                width > 1170 ? (items.length > 4 ? 5 : items.length) :
                                width > 767 ? (items.length > 2 ? 3 : items.length) : 
                                width > 568 ? (items.length > 1 ? 2 : items.length) : 1
                            }
                        />
                    </div>
                    <div className={classes.tags}>
                        <HgTags tags={hgTags}/>
                    </div>
                    <div className={classes.selector} id="selector">
                        <ToySelector tags={tags} currentLanguage={currentLanguage}/>
                    </div>
                    <div className={classes.insta}>
                        <InstaBlock/>
                    </div>
                    <div className={classes.news} id="news">
                        <NewsList 
                            items={news}
                            title={t("navigation.news")}
                            href="/blog"
                            slidesToShow={
                                width > 1170 ? (news.length > 3 ? 4 : news.length) :
                                width > 767 ? (news.length > 2 ? 3 : news.length) : 
                                width > 568 ? (news.length > 1 ? 2 : news.length) : 1
                            }
                        />
                    </div>
                    <div className={classes.brands} id="brands">
                        <h4>{t("brands.title")}</h4>
                        <div className={classes.brandsSlider}>
                            <CustomSlider 
                                slidesToShow={
                                    width > 1170 ? 5 : 
                                    width > 767 ? 5 : 
                                    width > 468 > 3 ? 3 : 1    
                                }
                                responsive={[
                                    {
                                      breakpoint: 600,
                                      settings: {
                                        slidesToShow: 4,
                                        slidesToScroll: 1,
                                      }
                                    },
                                    {
                                      breakpoint: 480,
                                      settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 1
                                      }
                                    }
                                ]}
                            >
                                {brands.map(el => (
                                    <BrandItem 
                                        key={el._id} 
                                        item={el}
                                    />
                                ))}
                            </CustomSlider>
                        </div>
                    </div>
                    <div className={classes.about} id="about">
                        <h4>{t("about.title")}</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus urna nunc, scelerisque sed mi eu, fermentum placerat nulla. Vivamus at facilisis turpis. Sed vulputate tincidunt neque vitae faucibus. Donec rhoncus justo odio, eu hendrerit metus gravida id. Maecenas fermentum, lacus ut sollicitudin sodales, orci eros dignissim lectus, in condimentum sem elit ac leo. Donec at massa id ex malesuada porttitor finibus ut urna. Morbi gravida quis est in maximus. Ut in fermentum eros, eget lobortis orci. Donec id sodales elit. Integer sodales dapibus leo sed ultrices. Cras imperdiet lectus est, non lobortis sem vestibulum id.</p>
                    </div>
                </AnimatedBlock>
            </MaxWidthContainer>
            <img src={sun_img} alt="sun" className={classes.sunImg}/>
        </PaddingContainer>
    )
}

export default Home