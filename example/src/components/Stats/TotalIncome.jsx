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

        let totalYear = now.getFullYear() - new Date(start).getFullYear()

        this.recentYears = Array.from({length: totalYear + 1}).map((_, index) => d.getFullYear() + index)

        this.state = {
            series: [70],
            labels: ['Income'],
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
                                label: 'Income'
                            }
                        }
                    }
                }
            }
        }
    }

    async componentDidMount() {

        api.get("/orders/stats/categories").then(({data, status}) => {
            if (status === 200) {

                const {categories} = data


                let addPopulateDate = []
                // for (let datum of data) {
                //     for (let recentYear of this.recentYears) {
                //         if(datum._id === recentYear){
                //             addPopulateDate.push({_id: recentYear, count: datum.count})
                //         }
                //     }
                // }
                //

                for (let cat of categories) {
                    if (addPopulateDate.findIndex(el => el.name == cat.name) === -1) {
                        addPopulateDate.push({_id: cat.name, count: 23})
                    }
                }

                // addPopulateDate.sort((a, b)=>a._id > b._id ? 1 : -1)

                // this.setState(prev => ({
                //     ...prev,
                //     series: addPopulateDate.map(i=>i.count),
                //     options: {
                //         ...prev.options,
                //         labels: categories.map(cat=>cat.name)
                //     }
                // }))
            }
        }).catch(ex => {
            this.setState(prev => ({
                ...prev,
                series: [],
            }))
        })
    }

    getUnique(arr, cb) {
        let items = []
        for (let arrElement of arr) {
            if (cb(arrElement, items)) {
                items.push(arrElement)
            }
        }
        return items
    }


    render() {
        return (
            <div id="chart" className="bg-body">

                <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" width={200}/>

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