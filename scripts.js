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
    const ground = Bodies.rectangle(200, 390, 400, 10, { isStatic: true }); // Adjusted the Y position to match the ground level
    World.add(world, ground);

    const num1 = pars
