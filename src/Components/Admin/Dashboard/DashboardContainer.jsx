import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getStats } from '../../../Redux/statsReducer'
import Preloader from '../../Common/Preloader/Preloader'
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import Dashboard from './Dashboard'
import moment from 'moment'
import { priceParser } from '../../../Utils/priceParser'

var colorPalette = ['#4B5EA2', 'goldenrod',  '#008000', '#ff6347', '#ff6347']

const DashboardContainer = (props) => {
    const {
        isFetching,
        stats,
        getStats
    } = props

    const [dateValue, setDateValue] = useState("all")
    const [filterDate, setFilterDate] = useState("")

    const handleFilterDate = (e) => {
        setDateValue(e.target.value)
        switch(e.target.value){
            case "year": {
                setFilterDate(moment().startOf('year'))
                break
            }
            case "3 month": {
                setFilterDate(moment().subtract(3, 'months'))
                break
            }
            case "current month": {
                setFilterDate(moment().startOf('month'))
                break
            }
            case "current week": {
                setFilterDate(moment().startOf('week'))
                break
            }
            case "today": {
                setFilterDate(moment().startOf('day'))
                break
            }
            default: 
                setFilterDate("")
                break
        }
    }

    const [donatChartInfo, setDonatChartInfo] = useState({
        series: [0, 0, 0, 0, 0],
        labels: ["Новые", "Отправленные", "Доставлены", "Отменены", "Возврат"],
        plotOptions: {
            pie: {
                donut: {
                    size: "20%"
                },
                customScale: 1.1,
                offsetX: 20,
                offsetY: -10
            }
        },
        colors: colorPalette,
        title: {
            text: 'Соотношение заказов',
            style: {
              fontSize: '16px',
              fontFamily: "Montserrat",
              fontWeight: "400",
              marginBottom: "16px",
              color: "#00000066",
            }
        },
        legend: {
            position: 'left',
            offsetY: 80,
            width: 130,
            fontFamily: "Montserrat",
            fontWeight: 400
        }
    })

    const [areaUsers, setAreaUsers] = useState({
        series: [{
            name: "users",
            data: [0, 0]
        }],
        chart: {
            type: 'area',
            height: 80,
            sparkline: {
                enabled: true
            },
        },
        colors: ["#4B5EA2"],
        stroke: {
            curve: 'smooth'
        },
        fill: {
            opacity: 0.3
        },
        xaxis: {
            crosshairs: {
                width: 0
            },
        },
        yaxis: {
            min: 0
        },
        title: {
            text: 123,
            offsetX: 0,
            style: {
                fontSize: '24px',
            }
        },
        subtitle: {
            text: 'Пользователи',
            offsetX: 0,
            style: {
                fontSize: '14px',
            }
        }
    })

    const [ordersBar, setOrdersBar] = useState({
        series: [{
            name: "Количество",
            data: [123, 24,121, 232,12,13, 123, 24,121, 252,12,13]
          }],
          options: {
            labels: [123, 24,121, 232,12,13, 123, 24,121, 252,12,13],
            chart: {
              type: 'area',
              height: 200,
              width: "100%",
              sparkline: {
                enabled: true
              },
            },
            stroke: {
              curve: 'smooth'
            },
            fill: {
              opacity: .7,
            },
            colors: ['#4B5EA2'],
            title: {
              text: '0 шт',
              offsetY: 25,
              style: {
                fontSize: '28px',
                fontFamily: "Montserrat",
                fontWeight: 'bold',
                color: '#4B5EA2',
              }
            },
            subtitle: {
              text: 'Общие поступления',
              offsetX: 0,
              offsetY: 0,
              style: {
                fontSize: '16px',
                color: "gray",
                fontFamily: "Montserrat",
            }
        }}
    })

    useEffect(() => {
        getStats(filterDate)
    }, [filterDate])

    useEffect(() => {
        if(stats) {
            setDonatChartInfo({
                ...donatChartInfo,
                series: stats.statusesCount,
            })
            setAreaUsers({
                ...areaUsers,
                series: [{
                    name: areaUsers.name,
                    data: stats.users.map(el => el.count)
                }],
                labels: stats.users.map(el => el.date)
            })
            setOrdersBar({
                ...ordersBar,
                series: [{
                    name: "Количество",
                    data: stats.ordersRange.map(el => el.count)
                }],
                options: {
                    ...ordersBar.options,
                    labels: stats.ordersRange.map(el => moment(el.date).format("DD/MM/YYYY")),
                    title: {
                        ...ordersBar.options.title,
                        text: priceParser(stats.startTotal) + " грн."
                    }
                }
            })
        }
    }, [stats])

    return (
        <AdminLayout>
            {isFetching ? <Preloader/> :
                stats ? 
                <Dashboard
                    donatChartInfo={donatChartInfo}
                    areaUsers={areaUsers}
                    stats={stats}
                    dateValue={dateValue}
                    ordersBar={ordersBar}
                    handleFilterDate={handleFilterDate}
                /> : <Preloader/>
            }
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    stats: state.stats.stats
})

export default connect(mapStateToProps, {
    getStats
})(DashboardContainer)