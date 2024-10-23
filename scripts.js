// Physics setup using Matter.js
const { Engine, Render, World, Bodies } = Matter;

let engine;
let world;
let cubes = [];
const canvas = document.getElementById('physicsCanvas');
const context = canvas.getContext('2d');
const groundHeight = 10; // Height of the ground

function setup() {
    engine = Engine.create();
    world = engine.world;

    // Create a static ground body with high friction
    const ground = Bodies.rectangle(200, canvas.height - groundHeight / 2, canvas.width, groundHeight, { 
        isStatic: true,
        friction: 1 // Increase friction to prevent sliding
    });
    World.add(world, ground);

    // Render setup
    Render.run(Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: 400,
            height: 400,
            wireframes: false, // Show filled shapes
        }
    }));

    Engine.run(engine);
}

function performCalculation() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    let result;

    // Handle calculations based on the selected operation
    if (isNaN(num1) || (operation !== 'sin' && operation !== 'cos' && operation !== 'tan' && isNaN(num2))) {
        result = "Please enter valid numbers.";
    } else {
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
                result = num2 !== 0 ? num1 / num2 : "Infinity";
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
    }

    document.getElementById('result').textContent = "Result: " + result;
}

function getRandomVibrantColor() {
    // Create bright, vibrant colors
    const colors = [
        'rgb(255, 0, 0)',  // Red
        'rgb(0, 255, 0)',  // Green
        'rgb(0, 0, 255)',  // Blue
        'rgb(255, 255, 0)', // Yellow
        'rgb(255, 165, 0)', // Orange
        'rgb(255, 20, 147)', // Deep Pink
        'rgb(0, 255, 255)', // Cyan
        'rgb(75, 0, 130)'   // Indigo
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function animateCubes() {
    // Clear previous cubes
    World.clear(world);
    cubes = [];

    // Re-add ground
    const ground = Bodies.rectangle(200, canvas.height - groundHeight / 2, canvas.width, groundHeight, { 
        isStatic: true,
        friction: 1 // Increase friction to prevent sliding
    });
    World.add(world, ground);

    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;

    // Calculate how many cubes to create based on the result
    let count = 0;
    let result;

    switch (operation) {
        case "add":
            result = num1 + num2;
            count = Math.min(result, 20); // Limit number of cubes for visibility
            break;
        case "subtract":
            result = num1 - num2;
            count = Math.min(Math.abs(result), 20); // Limit cubes for visibility
            break;
        case "multiply":
            result = num1 * num2;
            count = Math.min(result, 20); // Limit number of cubes for visibility
            break;
        case "divide":
            result = num2 !== 0 ? num1 / num2 : "Infinity";
            count = Math.floor(result); // Limit cubes to an integer
            break;
        case "sin":
        case "cos":
        case "tan":
            result = Math[operation](num1 * (Math.PI / 180)); // Calculate trig function
            count = Math.floor(Math.abs(result * 10)); // Use result for cube count
            break;
        case "power":
            result = Math.pow(num1, num2);
            count = Math.floor(result); // Limit cubes to an integer
            break;
    }

    // Add cubes to the world
    for (let i = 0; i < count; i++) {
        const cube = Bodies.rectangle(Math.random() * 150 + 125, Math.random() * 100 + 50, 30, 30, {
            restitution: 0.5, // Lower restitution to prevent excessive bouncing
            friction
