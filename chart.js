function BuildChart(labels, values, chartTitle) {
    var data = {
        labels: labels,
        datasets: [
            {
                label: chartTitle,
                data: values,
                backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                    'rgb(54, 162, 235)',
                ],
            }]
    };

    var ctx = document.getElementById("ChartRT").getContext('2d');
    var myChart = new Chart (ctx, {
        type: 'horizontalBar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes:[{
                    scaleLabel: {
                        display: true,
                        labelString: '$Billion'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Name'
                    }
                }]
            },
        }
    });

    return myChart;
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

        var json = JSON.parse(this.response);

        var labels = json.map(function (e) {
            return e.person.name;
        });

        var values = json.map(function (e) {
            return (e.finalWorth / 1000)
        });

        BuildChart(labels, values, "Real Time Net Worth");
    }
}

xhttp.open("GET", "https://forbes400.herokuapp.com/api/forbes400?limit=10", false);
xhttp.send();