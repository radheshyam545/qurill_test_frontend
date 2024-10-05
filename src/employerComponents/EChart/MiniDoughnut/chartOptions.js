
export const optionsFuncton = (colorProp = '#EFA14A', persentage, totalWeight, completedWeight) => {
    return {
        series: [{
            type: 'gauge',
            radius: '90%',
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
                    /////////////there we re pssing color scheme
                    color: colorProp
                    ////////////////
                }
            },
            axisLine: {
                lineStyle: {
                    width: 22, // Adjust the thickness of the progress bar
                    // color: [[0.5, '#EFA14A'], [1, '#D3D3D3']] // Color gradient for progress bar
                }
            },
            data: [{
                label: {
                    color: '#EFA14A' // Change the color of "Your score"
                },
                ///////////there we put value 
                value: persentage,
                //////////////////
                name: '',
                offsetCenter: ['20%', '10%'] // Adjust the position of "Your score"
            }], 
            axisTick: {
                show: false,
                splitNumber: 10, // Number of ticks
                length: 7, // Length of the dots
                lineStyle: {
                    color: 'red',
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
                color:colorProp,
                formatter: `${completedWeight}/${totalWeight}`, // Display percentage value
                offsetCenter: ['0%', '-1%'], // Adjust position of the detail
                textStyle: {
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            }
        }]
    }
    }