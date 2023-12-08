async function getData() {
    const response = await fetch("dataset.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    const labels = [];
    const dataset = [];
    rows.forEach((elem) => {
        const row = elem.split(",");
        const year = row[0];
        const temp = row[1];
        labels.push(year);
        dataset.push(temp);
        console.log(year, temp);
    });
    return { labels, dataset };
}

async function createChart() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const { labels, dataset } = await getData();

  new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: '# Temperature',
              data: dataset,
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: false, // Set to false to allow the offset
                  offset: true,      // Enable offset
                  suggestedMin: 14   // Set the offset value
              }
          }
      }
  });
}

createChart();
