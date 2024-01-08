import React from 'react';
import dynamic from "next/dynamic";
import apis, { blogApi } from "@/apis/index";
import Loader from "@/components/HttpResponse/Loader/Loader";


const ReactApexChart = dynamic(() => import("react-apexcharts"), {ssr: false});


class CountChart extends React.Component<any, any> {

    recentYears: number[] = []

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
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: this.recentYears,
                legend: {
                    position: 'bottom'
                },
                dataLabels: {
                    formatter(val, opts) {
                        const name = opts.w.globals.labels[opts.seriesIndex]
                        let v = opts.w.globals.seriesTotals[opts.seriesIndex] + " hits"
                        return [name, v]
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

    async componentDidMount() {
        // let t = [{"_id": 2022, "count": 2137}, {"_id": 2023, "count": 913}]
        blogApi.get("/visitors/stats?groupYear=true").then(({data, status}) => {
            if (status === 200) {

                let addPopulateDate  = []
                for (let datum of data) {
                    for (let recentYear of this.recentYears) {
                        if(datum._id === recentYear){
                            addPopulateDate.push({_id: recentYear, count: datum.count})
                        }
                    }
                }

                for (let recentYear of this.recentYears) {
                    if(addPopulateDate.findIndex(el=>el._id == recentYear) === -1){
                        addPopulateDate.push({_id: recentYear, count: 0})
                    }
                }

                addPopulateDate.sort((a, b)=>a._id > b._id ? 1 : -1)

                this.setState(prev => ({
                    ...prev,
                    series: addPopulateDate.map(item => item.count),
                    options: {
                        ...prev.options,
                        labels: addPopulateDate.map(item => item._id)
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

    getUnique<T>(arr: Array<T>, cb: (arg: T, items: Array<T>)=> boolean){
        let items: Array<T> = []
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

                    {this.state.series.length === 0 ? <Loader
                            size="small"
                            title="Data fetching"
                            className="flex justify-center items-center"
                            titleClass="text-xs !font-semibold !mt-2"
                    /> : <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380}/>}
                </div>

        )
    }

}

export default CountChart