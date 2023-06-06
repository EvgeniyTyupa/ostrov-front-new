import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import AnimatedBlock from "../../Components/Animation/AnimatedBlock/AnimatedBlock"
import MaxWidthContainer from "../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer"
import PaddingContainer from "../../Components/UI/Container/PaddingContainer/PaddingContainer"
import classes from "./Thankyou.module.css"
import thank_img from "../../Assets/thank.svg"
import { NavLink } from "react-router-dom"

const Thankyou = (props) => {
    const { t } = useTranslation()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <Helmet 
                    htmlAttributes={{"lang": "ua", "amp": undefined}}
                    title={`${t("siteName")} | Дякуємо`}
                    meta={[{"name": "description", "content": t("siteDescription")}]}
                />
                <AnimatedBlock className={classes.content}>
                    <div className={classes.text}>
                        <h2>Дякуємо, що обрали наш магазин!</h2>
                        <p>P.S. Ваше замовлення вже готується до відправки.</p>
                        <NavLink to="/">Повернутися на головну</NavLink>
                    </div>
                    <div className={classes.imgContainer}>
                        <img src={thank_img} alt="boy"/>
                    </div>
                </AnimatedBlock>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Thankyou