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

    // Create a static ground body
    const ground = Bodies.rectangle(200, canvas.height - groundHeight / 2, canvas.width, groundHeight, { isStatic: true });
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

    if (isNaN(num1) || isNaN(num2)) {
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
            default:
                result = "Unknown operation.";
        }
    }

    document.getElementById('result').textContent = "Result: " + result;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function animateCubes() {
    // Clear previous cubes
    World.clear(world);
    cubes = [];

    // Re-add ground
    const ground = Bodies.rectangle(200, canvas.height - groundHeight / 2, canvas.width, groundHeight, { isStatic: true });
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
    }

    // Add cubes to the world
    for (let i = 0; i < count; i++) {
        const cube = Bodies.rectangle(Math.random() * 350 + 25, Math.random() * 100 + 50, 30, 30, {
            restitution: 0.6, // Adjusted to prevent high bounces
            friction: 0.5, // Friction to help them come to rest
            frictionAir: 0.1, // Slight air friction for stability
            density: 0.04 // Increased density to prevent falling through
        });
        cube.color = getRandomColor(); // Assign a random vibrant color
        cubes.push(cube);
        World.add(world, cube);
    }

    // Start the rendering loop
    drawCubes(result);
}

function drawCubes(result) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the ground
    context.fillStyle = 'brown';
    context.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

    // Draw cubes
    for (const cube of cubes) {
        const { position } = cube;
        context.fillStyle = cube.color; // Use the assigned color
        context.fillRect(position.x - 15, position.y - 15, 30, 30);
    }

    // Display the result at the top left corner
    context.fillStyle = 'green'; // Set text color to green
    context.font = 'bold 16px Arial'; // Make the text bold
    context.clearRect(0, 0, 200, 30); // Clear previous result
    context.fillText("Result: " + result, 10, 20);
}

// Initialize the physics world
window.onload = setup;
