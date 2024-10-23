// Physics setup using Matter.js
const { Engine, Render, World, Bodies, Body, Composite } = Matter;

let engine;
let world;
let cubes = [];
const canvas = document.getElementById('physicsCanvas');
const context = canvas.getContext('2d');

function setup() {
    engine = Engine.create();
    world = engine.world;

    // Create a ground body
    const ground = Bodies.rectangle(200, 400, 400, 10, { isStatic: true });
    World.add(world, ground);

    // Render setup
    Render.run(Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: 400,
            height: 400,
            wireframes: false,
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

function animateCubes() {
    // Clear previous cubes
    World.clear(world);
    cubes = [];

    // Re-add ground
    const ground = Bodies.rectangle(200, 400, 400, 10, { isStatic: true });
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
            count = result;
            break;
        case "subtract":
            result = num1 - num2;
            count = Math.abs(result);
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
        const cube = Bodies.rectangle(Math.random() * 400, Math.random() * 100, 30, 30, {
            restitution: 0.8 // This makes the cube bounce
        });
        cubes.push(cube);
        World.add(world, cube);
    }

    // Draw cubes and result above them
    drawCubes(result);
}

function drawCubes(result) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the ground
    context.fillStyle = 'brown';
    context.fillRect(0, 390, 400, 10);

    // Draw cubes
    for (const cube of cubes) {
        const { position } = cube;
        context.fillStyle = 'blue';
        context.fillRect(position.x - 15, position.y - 15, 30, 30);
    }

    // Display the result above the cubes
    context.fillStyle = 'black';
    context.font = '16px Arial';
    context.fillText("Result: " + result, 150, 20);
}

// Initialize the physics world
window.onload = setup;
