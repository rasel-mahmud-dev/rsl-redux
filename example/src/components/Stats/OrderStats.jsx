import React, {lazy} from "react";
import Loader from "../Loader.jsx";

const ReactApexChart = lazy(() => import("react-apexcharts"));


class OrderStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalVisitor: 0,
            currentYear: new Date().getFullYear(),
            startDate: 2022,
            isFetchingData: false,
            series: [{
                name: 'count',
                data: []
            }],
            options: {
                chart: {
                    height: 300,
                    type: 'area',
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                    style: 'hollow',
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'month',
                    categories: [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ag", "Sep", "Oct", "Nov", "Dec"
                    ]
                },
                yaxis: {
                    title: "Total",
                    type: 'numeric',
                    labels: {
                        formatter: function (value) {
                            return value;
                        }
                    },
                    // categories: [
                    //     "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ag", "Sep", "Oct", "Nov", "Dec"
                    // ]

                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy'
                    },
                    y: {
                        format: 'count'
                    },
                },

                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 100]
                    }
                },
            },
            // selection: 'one_year',
        };
    }


    async componentDidUpdate() {

        this.setState(prev => ({
            ...prev,
            isFetchingData: true,
        }))


        const {year, items} = this.props

        let dataa = this.calculateDate(items, year)
        this.setState(prev => ({
            ...prev,
            isFetchingData: false,
            series: [{
                name: 'count',
                data: dataa
            }],
        }))
    }

    calculateDate = (items, year) => {

        let group = {
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

        items?.forEach(item => {
            const createdAt = new Date(item.createdAt)
            const date = createdAt.getMonth()
            if (group[date]) {
                group[date]++
            } else {
                group[date] = 1
            }
        })

        let data = []

        // let totalDays = daysInYear(year)
        // for (let i = 0; i < totalDays; i++) {
        //     let n = new Date(year.toString())
        //     n.setDate(i)
        //     let dateString = n.toDateString()
        //
        //     let dateNumber = new Date(dateString).getTime()
        //     data.push([
        //         dateNumber, group[dateString]
        //     ])
        // }
        // this.setState(prev=>({
        //     ...prev,
        //
        //     series: [{
        //         name: 'series1',
        //         data: data
        //     }],
        // }))

        for (let groupKey in group) {
            // let dateNumber = new Date(groupKey).getTime()
            data.push(group[groupKey]
            )
        }

        return data

    }

    handleShowYear = async (year) => {

        this.setState(prev => ({
            ...prev,
            currentYear: year,
            isFetchingData: true,
        }))

        let dataa = await this.calculateDate(year)

        this.setState(prev => ({
            ...prev,
            currentYear: year,
            isFetchingData: false,
            series: [{
                name: 'count',
                data: dataa
            }],
        }))
    }


    render() {

        let start = "1-1-2018"
        let d = new Date(start)
        let now = new Date()

        let totalYear = now.getFullYear() - new Date(start).getFullYear()

        return (
            <div className="">
                <div className="py-5">
                    <h2 className="text-2xl font-semibold uppercase">Orders</h2>
                    <div className="flex  flex-col-reverse md:flex-row justify-end items-center gap-x-4">
                        {this.state.isFetchingData && <Loader
                            size="small"
                            title=""
                            className="flex justify-center items-center pl-0 md:pl-20 mt-4 md:mt-0"
                            titleClass="text-xs !font-semibold"
                        />}
                    </div>
                </div>

                <div id="chart" className="bg-body">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={300}/>
                </div>


            </div>

        );
    }
}

export default OrderStats