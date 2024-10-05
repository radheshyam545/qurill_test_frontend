export const optionsFuncton = (value) => {
    // Ensure the value is between 0 and 100
    // let value ="100%";
    const numericValue = parseFloat(value.replace('%', '').trim());
    // Ensure the value is between 0 and 100
    const normalizedValue = isNaN(numericValue) ? 0 : Math.min(Math.max(numericValue, 0), 100);
    // Determine the color based on the value
    let color;
    if (normalizedValue >= 0) {
        color = '#67A381'; // Color for higher values
    } else {
        color = '#EEEEEE'; // Color for lower values
    }

    // Return the chart options
    return {
        series: [{
            type: 'gauge',
            radius: '90%',
            startAngle: 90, // Start angle is set to 90 degrees
            endAngle: -270, // End angle is set to -270 degrees (360 - 90)
            clockwise: false, // Set the gauge to run counterclockwise
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
                    color: color, // Set color dynamically based on value
                    borderRadius: 20 // Set border radius for the top corners
                }
            },
            axisLine: {
                lineStyle: {
                    width: 5,
                    color: [
                        [normalizedValue / 100, color], // Color up to the value percentage
                        [1, '#EEEEEE'] // Color beyond the value percentage
                    ]
                }
            },
            data: [{
                label: {
                    color: '#EFA14A' // Color of the label
                },
                value: normalizedValue,
                name: '',
                offsetCenter: ['20%', '10%']
            }],
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            },
            detail: {
                show: true,
                color: "#000",
                formatter: `${normalizedValue}%`, // Show the value as a percentage
                offsetCenter: ['0%', '0%'],
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'normal'
                }
            }
        }]
    };
};
