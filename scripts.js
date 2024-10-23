// Physics setup using Matter.js
const { Engine, Render, World, Bodies } = Matter;

let engine;
let world;
let cubes = [];

function setup() {
    engine = Engine.create();
    world = engine.world;

    const canvas = document.getElementById('physicsCanvas');
    const render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: 400,
            height: 400,
            wireframes: false,
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
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;

    // Clear previous cubes
    World.clear(world);
    cubes = [];

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
        const cube = Bodies.rectangle(Math.random() * 400, Math.random() * 400, 30, 30);
        cubes.push(cube);
        World.add(world, cube);
    }

    document.getElementById('result').textContent = "Result: " + result;
}

window.onload = setup;
