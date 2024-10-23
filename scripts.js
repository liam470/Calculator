// Matter.js setup
const { Engine, Render, World, Bodies } = Matter;

let engine;
let world;
const canvas = document.getElementById('physicsCanvas');
const groundHeight = 10; // Height of the ground

function setup() {
    engine = Engine.create();
    world = engine.world;

    // Create a static ground body
    const ground = Bodies.rectangle(canvas.width / 2, canvas.height - groundHeight / 2, canvas.width, groundHeight, {
        isStatic: true,
        friction: 1 // Ground friction
    });
    World.add(world, ground);

    // Render setup
    const render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: canvas.width,
            height: canvas.height,
            wireframes: false // Show filled shapes
        }
    });
    
    Render.run(render);
    Engine.run(engine);
}

function performCalculation() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    let result;

    // Handle calculations based on selected operation
    switch (operation) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
            break;
        case "sin":
            result = Math.sin(num1 * (Math.PI / 180)); // Convert degrees to radians
            break;
        case "cos":
            result = Math.cos(num1 * (Math.PI / 180)); // Convert degrees to radians
            break;
        case "tan":
            result = Math.tan(num1 * (Math.PI / 180)); // Convert degrees to radians
            break;
        case "power":
            result = Math.pow(num1, num2);
            break;
        default:
            result = "Unknown operation.";
    }

    document.getElementById('result').value = "Result: " + result;

    // Trigger cube animation after calculation
    animateCubes(num1, num2, operation);
}

function getRandomVibrantColor() {
    const colors = [
        'rgb(255, 0, 0)',  // Bright Red
        'rgb(0, 255, 0)',  // Bright Green
        'rgb(0, 0, 255)',  // Bright Blue
        'rgb(255, 255, 0)', // Bright Yellow
        'rgb(255, 165, 0)', // Bright Orange
        'rgb(255, 20, 147)', // Bright Pink
        'rgb(0, 255, 255)', // Bright Cyan
        'rgb(75, 0, 130)'   // Bright Indigo
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function animateCubes(num1, num2, operation) {
    // Clear previous cubes
    World.clear(world);
    const ground = Bodies.rectangle(canvas.width / 2, canvas.height - groundHeight / 2, canvas.width, groundHeight, {
        isStatic: true,
        friction: 1
    });
    World.add(world, ground);

    // Calculate how many cubes to create based on the result
    let count = 0;
    switch (operation) {
        case "add":
            count = Math.min(num1 + num2, 20);
            break;
        case "subtract":
            count = Math.min(Math.abs(num1 - num2), 20);
            break;
        case "multiply":
            count = Math.min(num1 * num2, 20);
            break;
        case "divide":
            count = Math.min(Math.round(num1 / num2), 20);
            break;
        case "sin":
        case "cos":
        case "tan":
            count = Math.min(Math.abs(Math.round(Math.sin(num1 * (Math.PI / 180)) * 10)), 20);
            break;
        case "power":
            count = Math.min(Math.round(Math.pow(num1, num2)), 20);
            break;
        default:
            count = 0;
    }

    // Create cubes and add them to the world
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 20 + 10; // Random size between 10 and 30
        const cube = Bodies.rectangle(Math.random() * canvas.width, 0, size, size, {
            restitution: 0.5, // Bounciness
            render: {
                fillStyle: getRandomVibrantColor() // Set random vibrant color
            }
        });
        World.add(world, cube);
    }
}

// Initialize the physics simulation
setup();
// Include mathjs for evaluating mathematical expressions
const math = window.math;

function plotGraph() {
    const equation = document.getElementById('equation').value;

    // Generate x and y values for the graph
    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x += 0.1) {
        try {
            // Evaluate the equation
            const y = math.evaluate(equation.replace(/x/g, x));
            xValues.push(x);
            yValues.push(y);
        } catch (error) {
            console.error('Error evaluating equation:', error);
        }
    }

    // Clear the existing graph
    const ctx = document.getElementById('graphCanvas').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Create the chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: `Graph of ${equation}`,
                data: yValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true,
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
