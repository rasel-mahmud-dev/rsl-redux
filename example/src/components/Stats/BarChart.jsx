import {MdAttachMoney} from "react-icons/md";
import {lazy, useEffect, useState} from "react";

const ReactApexChart = lazy(() => import("react-apexcharts"));


const options = {
    chart: {
        type: 'bar',
        // height: 100,
        toolbar: {
            show: false
        }
    },
    grid: {
        show: false,
    },
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 1,
            borderRadiusApplication: 'around',
            borderRadiusWhenStacked: 'all',
            columnWidth: '30%',
            barHeight: '100%',
            distributed: false,
            rangeBarOverlap: true,
            rangeBarGroupRows: false,
            hideZeroBarsWhenGrouped: false,
            isDumbbell: false,
            dumbbellColors: undefined,
            isFunnel: false,
            isFunnel3d: true,
            colors: {
                ranges: [{
                    from: 0,
                    to: 0,
                    color: undefined
                }],
                backgroundBarColors: [],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 0,
            },
            dataLabels: {
                position: 'top',
                maxItems: 12,
                hideOverflowingLabels: true,
                // orientation: horizontal,
                total: {
                    enabled: false,
                    formatter: undefined,
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: '#373d3f',
                        fontSize: '12px',
                        fontFamily: undefined,
                        fontWeight: 600
                    }
                }
            }
        }
    },

    dataLabels: {
        enabled: false,
        formatter: function (val) {
            return val + "%";
        },
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ["#304758"]
        }
    },
    stroke: {
        show: true,
        curve: 'straight',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },
    legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 0,
        offsetY: 0,
        labels: {
            colors: undefined,
            useSeriesColors: false
        },
        markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
        itemMargin: {
            horizontal: 5,
            vertical: 0
        },
        onItemClick: {
            toggleDataSeries: true
        },
        onItemHover: {
            highlightDataSeries: true
        },
    },

    states: {
        normal: {
            filter: {
                type: 'lighten',
                value: 0.01,
            }
        },
    },

    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        position: 'bottom',
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        labels: {
            show: false
        },
        crosshairs: {
            fill: {
                type: 'gradient',
                gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                }
            }
        },
        tooltip: {
            show: false,
            enabled: false,
        }
    },
    yaxis: {
        show: false,
        showAlways: false,
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
        },
        tooltip: {
            show: false,
            enabled: false,
        }

    },
    title: {
        // text: 'Monthly Inflation in Argentina, 2002',
        // floating: true,
        // offsetY: 330,
        // align: 'center',
        // style: {
        //     color: '#444'
        // }
    }
}

function BarChart({bgColor, label, totalValue, items, countProperty}) {


    const [series, setSeries] = useState({
        name: '',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    })

    useEffect(() => {
        const monthes = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }

        if (items) {
            for (let item of items) {
                monthes[item.month] = item[countProperty]
            }
            setSeries({
                name: "",
                data: Object.values(monthes)
            })
        }
    }, [items?.length])


    return (
        <div className="p-5">

            <div className="font-semibold text-base flex items-center justify-between mb-2">
                <div className="flex items-center  gap-x-2 ">
                    <div className={`${bgColor} p-2 rounded-md`}>
                        <MdAttachMoney/>
                    </div>
                    <h4 className="">{label}</h4>
                </div>
                <h4>{totalValue}</h4>

            </div>
            <div className={`flex items-center justify-between w-full  rounded-xl gap-x-5 px-4 ${bgColor}`}>
                <div id="chart">
                    <ReactApexChart options={options} series={[series]} type="bar" height={140}/>
                </div>


            </div>
        </div>
    )
}

export default BarChart