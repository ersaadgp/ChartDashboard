import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2'

class Chart extends Component{
    constructor(props){
        super(props)
        this.state = {
            chartData:{
                labels: [
                    '10/10/2020', '10/10/2020', '10/10/2020',
                    '10/10/2020', '10/10/2020', 
                    '10/10/2020', '10/10/2020'
                ],
                datasets: [{
                    label: 'Amount', 
                    data: [
                        234, 325, 222, 232, 132, 809, 498
                    ],
                    backgroundColor: [
                        '#fcbf1e',
                        '#40bad5',
                        '#035aa6',
                        '#fcbf1e',
                        '#40bad5',
                        '#035aa6'
                    ],
                    fill: 'false',
                    borderColor: 'fcbf1e'
                }]
            }
        }
    }

    render(){
        return (
            <div className="chart">
                <Line
                    data={this.state.chartData}
                    fill={false}
                    // width={1}
                    // height={1}
                    type='line'
                    options={{
                        
                    }}
                />
            </div>
        )
    }
}

export default Chart