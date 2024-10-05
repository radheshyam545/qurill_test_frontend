
export const options = (percentage = 0) => {

    let colorPer = percentage <= 25 ? '#DA5F49' : percentage <= 85 ?  '#EFA14A' : '#67A381'
    return {
        series: [
            {
                type: 'gauge',
                radius: '100%',
                startAngle: 90,
                endAngle: -270,
                clockwise: true,
                pointer: {
                    show: false
                },
                progress: {
                    show: true,
                    overlap: false,
                    roundCap: true,
                    clip: false,
                    itemStyle: {
                        borderWidth: 0,
                        color: colorPer
                        
                        // colorPer
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 40, // Adjust the thickness of the progress bar
                        // color: [[0.5, '#EFA14A'], [1, '#D3D3D3']] // Color gradient for progress bar
                    }
                },
                data: [
                    {
                        label: {
                            color: '#EFA14A' // Change the color of "Your score"
                        },


                        /////////the we put comp?? 0,leteion profile  put value
                        value: isNaN(percentage) ? 0 : percentage, 
                        //////////////////there is end  
                        name: 'Your score',
                        offsetCenter: ['10%', '10%'] // Adjust the position of "Your score"
                    }
                ],
                axisTick: {
                    show: false,
                    splitNumber: 10, // Number of ticks
                    length: 7, // Length of the dots
                    lineStyle: {
                        color: '#67A381',
                        width: 10 // Adjust the thickness of the dots
                    },
                    type: 'circle',
                    color: [
                        [0.33, 'red'],   // 0-33% range, red color
                        [0.66, 'green'], // 34-66% range, green color
                        [1, 'blue']      // 67-100% range, blue color
                    ]
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                detail: {
                    show: true,
                    color: '#EFA14A',
                    formatter: `${percentage}%`, // Display percentage value
                    offsetCenter: ['0%', '-1%'], // Adjust position of the detail
                    textStyle: {
                        fontSize: 50,
                        fontWeight: 'bold'
                    }
                }
            },
            {
                legend: {
                    top: '50%',
                    left: 'center'
                },
                type: 'pie',
                radius: ['70%', '65%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false
                },
                data: [
                    { value: 250, name: 'Needs Work', itemStyle: { color: '#DA5F49' } },
                    { value: 400, name: 'On Track', itemStyle: { color: '#EBA44A' } },
                    { value: 150, name: 'Good Job', itemStyle: { color: '#67A381' } }
                ]
            }
        ],
        legend: {
            orient: 'vertical',
            left: 'right',
            data: ['Needs Work', 'On Track', 'Good Job'],
            itemWidth: 25, // Adjust the width of legend items
            itemHeight: 25, // Adjust the height of legend items
            textStyle: {
                fontSize: 16 // Adjust the font size of legend text
            }
        }
    }
};
