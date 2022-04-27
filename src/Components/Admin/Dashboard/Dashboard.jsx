import React from 'react'
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock'
import classes from './Dashboard.module.css'
import Chart from 'react-apexcharts'
import { cx } from '../../../Utils/classnames'
import { MdOutlineAttachMoney } from 'react-icons/md';
import { GiTrophyCup } from 'react-icons/gi';
import { HiUsers } from 'react-icons/hi';
import { priceParser } from '../../../Utils/priceParser'
import CustomSelect from '../../UI/Form/Select'
import { MenuItem } from '@mui/material'

const Dashboard = (props) => {
    const { 
        donatChartInfo,
        stats,
        dateValue,
        handleFilterDate
    } = props

    return (
        <AnimatedBlock className={classes.main}>
            <div className={classes.date}>
                <h2>Статистика</h2>
                <label>Отобразить:</label>
                <CustomSelect onChange={handleFilterDate} value={dateValue}>
                    <MenuItem value="all">За все время</MenuItem>
                    <MenuItem value="year">За текущий год</MenuItem>
                    <MenuItem value="3 month">За последние 3 месяца</MenuItem>
                    <MenuItem value="current month">За за текущий месяц</MenuItem>
                    <MenuItem value="current week">За текущую неделю</MenuItem>
                    <MenuItem value="today">За сегодня</MenuItem>
                </CustomSelect>
            </div>
            <div className={classes.content}>
                <div className={classes.mini}>
                    <div className={cx(classes.card, classes.total)}>
                        <div className={classes.miniSide}>
                            <p className={classes.titleLabel}>Общие поступления</p>
                            <h3 className={classes.value}>{priceParser(stats.startTotal)} грн.</h3>
                        </div>
                        <div className={classes.miniIcon}>
                            <MdOutlineAttachMoney/>
                        </div>
                    </div>
                    <div className={cx(classes.card, classes.totalEarn)}>
                        <div className={classes.miniSide}>
                            <p className={classes.titleLabel}>Всего заработано</p>
                            <h3 className={classes.value}>{priceParser(stats.totalSum)} грн.</h3>
                        </div>
                        <div className={classes.miniIcon}>
                            <MdOutlineAttachMoney/>
                        </div>
                    </div>
                    <div className={cx(classes.card, classes.totalLastMonth)}>
                        <div className={classes.miniSide}>
                            <p className={classes.titleLabel}>Затраты</p>
                            <h3 className={classes.value}>{priceParser(stats.totalCostSum)} грн.</h3>
                        </div>
                        <div className={classes.miniIcon}>
                            <MdOutlineAttachMoney/>
                        </div>
                    </div>
                    {/* <div className={cx(classes.card, classes.users)}>
                        <div className={classes.miniSide}>
                            <p className={classes.titleLabel}>Всего пользователей</p>
                            <h3 className={classes.value}>{stats.users.length}</h3>
                        </div>
                        <div className={classes.miniIcon}>
                            <HiUsers/>
                        </div>
                    </div> */}
                </div>
                <div className={classes.charts}>
                    <div className={cx(classes.card, classes.donat)}>
                        {donatChartInfo.series.reduce((partialSum, a) => partialSum + a, 0) > 0 ?
                        <Chart
                            options={donatChartInfo}
                            series={donatChartInfo.series}
                            type="donut"
                            height={"100%"}
                        />
                        : 
                        <div>
                            <p className={classes.titleLabel}>Соотношение заказов</p>
                            <h3 className={classes.empty}>Данные отсутствуют.</h3>
                        </div>
                        }
                    </div>
                </div>
                <div className={classes.popularSection}>
                    <div className={cx(classes.card, classes.popular)}>
                        <div className={classes.popularSide}>
                            <div className={classes.miniSide}>
                                <p className={classes.titleLabel}>Топ-3 товара</p>
                            </div>
                            <div className={classes.popularWrapper}>
                                {stats.topItems.length > 0 ? stats.topItems.map((el, index) => (
                                    <div className={cx(classes.popularItem, index === 0 ? classes.topItem : "")}>
                                        <label>{index + 1}.</label>
                                        <img src={el.item.images[0]} alt="image"/>
                                        <div>
                                            <h3>{el.item.name}</h3>
                                            <div className={classes.buyCount}>
                                                <p>{el.count} шт.</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : <h3 className={classes.empty}>Данные отсутствуют.</h3>}
                            </div>
                        </div>
                    </div>
                    <div className={classes.card}>
                        <div className={classes.otherPopular}>
                            <div className={classes.item}>
                                <p className={classes.titleLabel}>Самый популярный бренд</p>
                                <h3>{stats.topBrand ? stats.topBrand.brand.name : "Данные отсутствуют."}</h3>
                            </div>
                            <div className={classes.item}>
                                <p className={classes.titleLabel}>Самая популярная категория</p>
                                <h3>{stats.topCategory ? stats.topCategory.category.name : "Данные отсутствуют."}</h3>
                            </div>
                            <div className={classes.item}>
                                <p className={classes.titleLabel}>Самая популярная тематика</p>
                                <h3>{stats.topTag ? stats.topTag.tag.name : "Данные отсутствуют."}</h3>
                            </div>
                        </div>
                    </div>
                    <div className={cx(classes.card, classes.promocodes)}>
                        <h3>Промокоды</h3>
                        <div className={classes.popularWrapper}>
                            {stats.promocodes.map((el, index) => (
                                <div className={classes.promocode}>
                                    <div className={classes.promocodeInfo}>
                                        <label>{index + 1}.</label>
                                        <p>{el.name}</p>
                                    </div>
                                    <span>{el.count_of_usage}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedBlock>
    )
}

export default Dashboard