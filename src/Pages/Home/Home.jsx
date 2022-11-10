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
        maxPrice
    } = props

    const { t } = useTranslation()

    const { width } = useWindowDimensions()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer>
                <Helmet 
                    htmlAttributes={{"lang": "ua", "amp": undefined}}
                    title={`${t("siteName")} | ${"Головна"}`}
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
                        <ToySelector tags={tags} currentLanguage={currentLanguage} maxPrice={maxPrice}/>
                    </div>
                    <div className={classes.insta}>
                        <InstaBlock/>
                    </div>
                    <div className={classes.news} id="news">
                        <NewsList 
                            items={news}
                            title={t("navigation.news")}
                            href="/blog"
                            slidesToShow={news.length > 3 ? 4 : 4}
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
                    <div className={classes.about} id="about_us">
                        <div className={classes.aboutText}>
                            <h4>{t("about.title")}</h4>
                            <p>
                                Давайте познайомимось поближче!
                                <br/><br/>
                                Мене звати Олена, мати двох дорослих дітей та співзасновник Острівка.
                                <br/><br/>
                                Історія цього магазину починається з 2017 року, коли Інстаграм бізнес тільки набирав обертів. Мене вдохновила ідея створити щось своє, свій бізнес у якому я можу бути корисною людям. Сама я у той час працювала бухгалетором на заводі, у якому будувала свою кар’єру з 2002 року, але як ви вже зрозуміли я обрала шлях за метою.
                                <br/><br/>
                                Більше про історію, команду та другі цікаві історії ви можете почитати у наших новинах.
                                <br/><br/>
                                Тепер більше конкретики:
                                <br/><br/>
                                Острівок у цифрах
                            </p> 
                            <ul>
                                <li>5 років досвіду у пошуці найкрутезніших іграшок;</li>
                                <li>25 дитячих конкурсів біля магазину;</li>
                                <li>&gt;1500 задоволенних клієнтів;</li>
                                <li>&gt;7000 відправленних іграшок;</li>
                                <li>50 розіграшей подарунків;</li>
                                <li>10 людей у команді;</li>
                            </ul>
                            <p>Обираючи Острівок ви автоматично допомагаєте нашій державі тому, що ми вправно платимо податки та офіційно працюємо.</p>
                            <br/><br/>
                            <p>Долучайтесь до нашого ком’юніті та кайфуйте від найкрутезніших іграшок!</p>
                        </div>
                    </div>
                </AnimatedBlock>
            </MaxWidthContainer>
            <img src={sun_img} alt="sun" className={classes.sunImg}/>
        </PaddingContainer>
    )
}

export default Home