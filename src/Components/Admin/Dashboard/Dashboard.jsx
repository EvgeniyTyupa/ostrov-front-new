import React from 'react'
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock'
import classes from './Dashboard.module.css'
import Chart from 'react-apexcharts'
import { cx } from '../../../Utils/classnames'
import { MdOutlineAttachMoney } from 'react-icons/md';
import { GiTrophyCup } from 'react-icons/gi';
import { HiUsers } from 'react-icons/hi';
import { priceParser } from '../../../Utils/priceParser'

const Dashboard = (props) => {
    const { 
        donatChartInfo,
        stats
    } = props

    return (
        <AnimatedBlock className={classes.main}>
            <div className={classes.mini}>
                <div className={cx(classes.card, classes.total)}>
                    <div className={classes.miniSide}>
                        <p className={classes.titleLabel}>Всего заработано</p>
                        <h3 className={classes.value}>{priceParser(stats.totalSumByAllTime)} грн.</h3>
                    </div>
                    <div className={classes.miniIcon}>
                        <MdOutlineAttachMoney/>
                    </div>
                </div>
                <div className={cx(classes.card, classes.totalLastMonth)}>
                    <div className={classes.miniSide}>
                        <p className={classes.titleLabel}>За последний месяц</p>
                        <h3 className={classes.value}>{priceParser(stats.totalSumByLastMonth)} грн.</h3>
                    </div>
                    <div className={classes.miniIcon}>
                        <MdOutlineAttachMoney/>
                    </div>
                </div>
                <div className={cx(classes.card, classes.users)}>
                    <div className={classes.miniSide}>
                        <p className={classes.titleLabel}>Всего пользователей</p>
                        <h3 className={classes.value}>{stats.usersCount}</h3>
                    </div>
                    <div className={classes.miniIcon}>
                        <HiUsers/>
                    </div>
                </div>
            </div>
            <div className={classes.charts}>
                <div className={classes.popularSection}>
                    <div className={cx(classes.card, classes.popular)}>
                        <div className={classes.miniSide}>
                            <p className={classes.titleLabel}>Топ-3 товара</p>
                            {/* <h3 className={classes.value}>{priceParser(stats.totalSumByAllTime)} грн.</h3> */}
                        </div>
                        
                        <div className={classes.popularWrapper}>
                            {stats.popularItems.map((el, index) => (
                                <div className={cx(classes.popularItem, index === 0 ? classes.topItem : "")}>
                                    <label>{index + 1}.</label>
                                    <img src={el.images[0]} alt="image"/>
                                    <div>
                                        <h3>{el.name}</h3>
                                        <div className={classes.buyCount}>
                                            <p>{el.buy_count} шт.</p>
                                            {/* {index === 0 && <GiTrophyCup/>} */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx(classes.card, classes.donat)}>
                    <Chart
                        options={donatChartInfo}
                        series={donatChartInfo.series}
                        type="donut"
                        height={"100%"}
                    />
                </div>
            </div>
        </AnimatedBlock>
    )
}

export default Dashboard