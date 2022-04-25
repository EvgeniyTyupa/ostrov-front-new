import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getStats } from '../../../Redux/statsReducer'
import Preloader from '../../Common/Preloader/Preloader'
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import Dashboard from './Dashboard'

var colorPalette = ['#4B5EA2', 'goldenrod',  '#008000', '#ff6347', '#ff6347']

const DashboardContainer = (props) => {
    const {
        isFetching,
        stats,
        getStats
    } = props

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
              fontSize: '18px',
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

    useEffect(() => {
        getStats()
    }, [])

    useEffect(() => {
        if(stats) {
            setDonatChartInfo({
                ...donatChartInfo,
                series: stats.statusesCount,
            })
        }
    }, [stats])

    return (
        <AdminLayout>
            {isFetching ? <Preloader/> :
                stats ? 
                <Dashboard
                    donatChartInfo={donatChartInfo}
                    stats={stats}
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