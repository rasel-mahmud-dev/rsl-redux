import React, {lazy} from 'react';
import {api} from "../../axios"
import Loader from "../Loader.jsx";

const ReactApexChart = lazy(() => import("react-apexcharts"));

class CountChart extends React.Component{

    recentYears = []

    constructor(props) {
        super(props);

        let start = "1-1-2021"
        let d = new Date(start)
        let now = new Date()

        let totalYear = now.getFullYear() - new Date(start).getFullYear()

        this.recentYears = Array.from({length: totalYear + 1}).map((_, index) => d.getFullYear() + index)

        this.state = {

            series: [],
            options: {
                plotOptions: {
                    pie: {
                        size: 200
                    }
                },
                chart: {
                    // width: 180,
                    type: 'pie',
                },

                labels: [],
                legend: {
                    position: 'top',

                },
                dataLabels: {
                    formatter(val, opts) {
                        const name = opts.w.globals.labels[opts.seriesIndex]
                        let v = opts.w.globals.seriesTotals[opts.seriesIndex] + " hits"
                        return ""
                    }
                },
                colors: [
                    '#2c65ec',
                    '#E91E63',
                    '#9f89ff', '#b6ff9e',
                    '#af4242', '#d98e7c',
                    '#e1b663', '#53235e'
                ],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },


        };
    }

    async componentDidMount() {

        api.get("/orders/stats/categories").then(({data, status}) => {
            if (status === 200) {

                const {categories} = data


                let addPopulateDate  = []
                // for (let datum of data) {
                //     for (let recentYear of this.recentYears) {
                //         if(datum._id === recentYear){
                //             addPopulateDate.push({_id: recentYear, count: datum.count})
                //         }
                //     }
                // }
                //

                for (let cat of categories) {
                    if(addPopulateDate.findIndex(el=>el.name == cat.name) === -1){
                        addPopulateDate.push({_id: cat.name, count: 23})
                    }
                }

                // addPopulateDate.sort((a, b)=>a._id > b._id ? 1 : -1)

                this.setState(prev => ({
                    ...prev,
                    series: addPopulateDate.map(i=>i.count),
                    options: {
                        ...prev.options,
                        labels: categories.map(cat=>cat.name)
                    }
                }))
            }
        }).catch(ex => {
            this.setState(prev => ({
                ...prev,
                series: [],
            }))
        })
    }

    getUnique(arr, cb){
        let items = []
        for (let arrElement of arr) {
            if(cb(arrElement, items)){
                items.push(arrElement)
            }
        }
        return items
    }


    render() {
        return (
                <div id="chart" className="bg-body">

                    <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={500}  />

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