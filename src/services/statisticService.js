export const statisticService = {
    createStatistics, createPieData, createBarData
}

function createStatistics(attacks) {
    return attacks.reduce((acc, attack) => {
        if (attack.objects[0].x_mitre_platforms) {
            attack.objects[0].x_mitre_platforms.map((platform) => {
                var count = acc.platforms[platform];
                acc.platforms[platform] = count ? count + 1 : 1;
            })
        }
        if (attack.objects[0].x_mitre_data_sources) {
            attack.objects[0].x_mitre_data_sources.map((dataSource) => {
                var count = acc.dataSources[dataSource];
                acc.dataSources[dataSource] = count ? count + 1 : 1;
            })
        }
        return acc;
    }, { platforms: {}, dataSources: {}, })

}

function createPieData(statistics) {
    return {
        series: Object.values(statistics.platforms),
        options: {
            chart: {
                width: 600,
                type: 'pie',

            },
            labels: Object.keys(statistics.platforms),
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 400

                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    };
}

function createBarData(statistics) {
    return {
        series: [{
            name: 'Attacks',
            data: Object.values(statistics.dataSources)
        }],
        options: {
            annotations: {
                points: [{
                    x: 'Attacks',
                    seriesIndex: 0,
                    label: {
                        borderColor: '#775DD0',
                        offsetY: 0,
                        style: {
                            color: '#fff',
                            background: '#775DD0',
                        },
                        text: '',//TODO 
                    }
                }]
            },
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    columnWidth: '50%',
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2
            },

            grid: {
                row: {
                    colors: ['#fff', '#f2f2f2']
                }
            },
            xaxis: {
                labels: {
                    rotate: -45
                },
                categories: Object.keys(statistics.dataSources),
                tickPlacement: 'on'
            },
            yaxis: {
                title: {
                    text: 'Data Sources',
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 0.85,
                    opacityTo: 0.85,
                    stops: [50, 0, 100]
                },
            }
        },
    };
}