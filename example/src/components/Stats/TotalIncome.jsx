import React, {lazy} from 'react';
import {api} from "../../axios"
import Loader from "../Loader.jsx";

const ReactApexChart = lazy(() => import("react-apexcharts"));

class CountChart extends React.Component {

    recentYears = []

    constructor(props) {
        super(props);

        let start = "1-1-2021"
        let d = new Date(start)
        let now = new Date()

        const label = this.props?.label

        let totalYear = now.getFullYear() - new Date(start).getFullYear()

        this.recentYears = Array.from({length: totalYear + 1}).map((_, index) => d.getFullYear() + index)

        this.state = {
            series: [70],
            labels: [label],
            options: {

                chart: {
                    height: 350,
                    type: 'radialBar',
                },
                colors: [
                    '#5bcb8a'
                ],
                plotOptions: {
                    radialBar: {
                        dataLabels: {
                            name: {
                                show: true,
                            },
                            value: {
                                show: false,
                                fontSize: '14px',
                                formatter: function (val) {
                                    // return val + '%'
                                    return ""
                                }
                            },
                            total: {
                                show: true,
                                label: label
                            }
                        }
                    }
                }
            }
        }
    }

    render() {
        return (
            <div id="chart" className="bg-body">

                <div className="flex flex-col    items-center">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" width={200}/>
                    <h4 className="-mt-3 pb-4 font-semibold">{this.props.value}</h4>
                </div>

                {/*{this.state.series.length === 0 ? <Loader*/}
                {/*        size="small"*/}
                {/*        title="Data fetching"*/}
                {/*        className="flex justify-center items-center"*/}
                {/*        titleClass="text-xs !font-semibold !mt-2"*/}
                {/*/> : <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380}/>}*/}

            </div>

        )
    }

}

export default CountChart