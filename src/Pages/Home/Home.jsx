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
import { shuffle } from '../../Utils/shuffle'
import MainSlide from '../../Components/Common/MainSlide/MainSlide'

const Home = (props) => {
    const { 
        categories,
        actions,
        items,
        news,
        brands,
        hgTags,
        tags,
        currentLanguge,
        viewOnMainPosts
    } = props

    const { t } = useTranslation()

    let slides = [...actions]

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.top}>
                    <CategoriesList categories={categories}/>
                    <div className={classes.actionSlider}>
                        <CustomSlider type="action">
                            {shuffle(slides.concat(viewOnMainPosts)).map(item => (
                                <MainSlide item={item} key={item._id} currentLanguge={currentLanguge}/>
                            ))}
                        </CustomSlider>
                    </div>
                </div>
                <div className={classes.popular}>
                    <SmallItemsList 
                        items={items} 
                        title={t("items.itemsListTitle")} 
                        href={`/catalog?pageNumber=1&pageSize=25&searchBy=popular&from=asc`}
                        slidesToShow={items.length > 4 ? 5 : items.length}
                    />
                </div>
                <div className={classes.tags}>
                    <HgTags tags={hgTags}/>
                </div>
                <div className={classes.selector} id="selector">
                    <ToySelector tags={tags} currentLanguge={currentLanguge}/>
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
                <div className={classes.brands}>
                    <h4>{t("brands.title")}</h4>
                    <div className={classes.brandsSlider}>
                        <CustomSlider slidesToShow={brands.length > 4 ? 5 : brands.length}>
                            {brands.map(el => <BrandItem key={el._id} item={el}/>)}
                        </CustomSlider>
                    </div>
                </div>
                <div className={classes.about}>
                    <h4>{t("about.title")}</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus urna nunc, scelerisque sed mi eu, fermentum placerat nulla. Vivamus at facilisis turpis. Sed vulputate tincidunt neque vitae faucibus. Donec rhoncus justo odio, eu hendrerit metus gravida id. Maecenas fermentum, lacus ut sollicitudin sodales, orci eros dignissim lectus, in condimentum sem elit ac leo. Donec at massa id ex malesuada porttitor finibus ut urna. Morbi gravida quis est in maximus. Ut in fermentum eros, eget lobortis orci. Donec id sodales elit. Integer sodales dapibus leo sed ultrices. Cras imperdiet lectus est, non lobortis sem vestibulum id.</p>
                </div>
            </MaxWidthContainer>
            <img src={sun_img} alt="sun" className={classes.sunImg}/>
        </PaddingContainer>
    )
}

export default Home