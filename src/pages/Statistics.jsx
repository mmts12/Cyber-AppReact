import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import Loading from './../cmps/Loading';
import { statisticService } from './../services/statisticService';


export function Statistics() {
    const [dataPlatforms, setDataPlatforms] = useState(null)
    const [dataSources, setDataSources] = useState(null)
    const { attacks } = useSelector(state => state.attackModule);

    useEffect(() => {
        createState();
    }, [attacks])

    const createState = () => {
        if (!attacks) return;
        console.log(attacks);
        const statistics = statisticService.createStatistics(attacks);
        setDataPlatforms(statisticService.createPieData(statistics));
        setDataSources(statisticService.createBarData(statistics));
    }


    if (!attacks || !dataPlatforms || !dataSources) return <Loading />
    return (
        <section className="statistics-container max-layout">
            <div className="pie-chart">
                <h2>Platforms</h2>
                <h3>Attacks per platform</h3>
                <ReactApexChart options={dataPlatforms.options} series={dataPlatforms.series} type="pie" width={500} />
            </div>
            <div className="bar-chart">
                <h2>Data sources</h2>
                <h3>Attacks per data source</h3>
                <ReactApexChart options={dataSources.options} series={dataSources.series} type="bar" height={500} />
            </div>
        </section>
    )
}
