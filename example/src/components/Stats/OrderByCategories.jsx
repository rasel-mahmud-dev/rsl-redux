import React, {lazy} from "react";
import Loader from "../Loader.jsx";
import formatPrice from "../../utils/formatPrice.js";

const ReactApexChart = lazy(() => import("react-apexcharts"));


class OrderStats extends React.Component {
    constructor(props) {
        super(props);
        const type = this.props.type
        this.calculateDate = this.calculateDate.bind(this)
        this.calc = this.calc.bind(this)
        this.state = {
            totalVisitor: 0,
            currentYear: new Date().getFullYear(),
            startDate: 2022,
            isFetchingData: false,
            series: [],
            options: {
                chart: {
                    height: 300,
                    type: 'area',
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: true
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
                    decimalsInFloat: type === "quantity",
                    labels: {
                        formatter: function (value) {
                            return type === "quantity"
                                ? value
                                : formatPrice(value, 2);
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
                        // format: 'count',
                        formatter: function (value) {
                            return  type === "quantity"
                                ? value
                                : formatPrice(value, 2);
                        }
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

    componentDidMount() {
        const { items} = this.props
        if(items.length){
            this.calc(items)
        }
    }

    async componentDidUpdate(prevProps) {
        const { items} = this.props

        if (prevProps.items?.length !== items?.length) {
            this.calc(items)
        }
    }

    calculateDate = (items) => {

        const {type} = this.props
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
            let p = 0
            if(type === "quantity"){
                p = item.quantity
            } else {
                p = Number(item.totalPrice).toFixed(2)
            }

            if (group[date]) {
                group[date] += p
            } else {
                group[date] = p
            }
        })

        let data = []
        for (let groupKey in group) {
            // let dateNumber = new Date(groupKey).getTime()
            data.push(group[groupKey])
        }

        return data

    }

    calc(items){
        this.setState(prev => ({
            ...prev,
            isFetchingData: true,
        }))

        let categories = []
        for (let item of items) {
            let dataa = this.calculateDate(item.items)
            categories.push({
                name: item._id,
                data: dataa
            })
        }


        this.setState(prev => ({
            ...prev,
            isFetchingData: false,
            series: categories,
        }))
    }



    render() {

        return (
            <div className="">
                <div className="pt-5">
                    <h2 className="text-base font-semibold uppercase">{this.props.label ?? "Orders"}</h2>
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