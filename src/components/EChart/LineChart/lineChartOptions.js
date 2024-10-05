export const options = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['Impressions', 'Clicks'], // Adjust legend data accordingly
        selected: {
            'Impressions': true, // Set initial visibility of series
            'Clicks': true
        }
    },
    grid: {   // Adjust the size of the chart
        left: '10%',
        right: '10%',
        top: '10%',
        bottom: '10%',
        containLabel: true,
        width: '80%',  // Increase the width of the chart
        height: '80%'  // Increase the height of the chart
    },
    xAxis: [{
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    }, {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        axisLabel: { show: false } // Hide labels for monthly ticks
    }],
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Impressions',
            type: 'line',
            smooth: true,
            data: [1200, 3000, 2500, 1500, 1600, 3500, 1800] // Jan
            // Include data for other months...
        },
        {
            name: 'Clicks', // Name of the new series
            type: 'line', // Type of the new series
            smooth: true,
            data: [800, 1800, 1500, 900, 1000, 2000, 1200] // Jan (replace with actual data)
            // Include data for other months...
        }
    ]
    
};

