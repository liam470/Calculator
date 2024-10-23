function calculate() {
    const input = document.getElementById('calc-input').value;
    try {
        const result = math.evaluate(input);
        document.getElementById('calc-result').value = result;
    } catch (error) {
        document.getElementById('calc-result').value = "Error";
    }
}

function insertSymbol(symbol) {
    const inputField = document.getElementById('calc-input');
    inputField.value += symbol; // Insert the symbol at the end of the input
}

function plotGraph() {
    const ctx = document.getElementById('graphCanvas').getContext('2d');
    const input = document.getElementById('graph-input').value;

    const labels = [];
    const dataPoints = [];
    for (let x = -10; x <= 10; x += 0.1) {
        labels.push(x);
        try {
            dataPoints.push(math.evaluate(input.replace(/x/g, x)));
        } catch (error) {
            alert('Invalid function. Please enter a valid mathematical expression.');
            return;
        }
    }

    // Clear previous graph
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Create new chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Graph of ' + input,
                data: dataPoints,
                borderColor: 'rgba(106, 90, 205, 1)',
                backgroundColor: 'rgba(106, 90, 205, 0.2)',
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X-axis'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y-axis'
                    }
                }
            }
        }
    });
}
