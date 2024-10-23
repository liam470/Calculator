// Matter.js setup
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
    const ground = Bodies.rectangle(200, canvas.height - groundHeight / 2, canvas.width, groundHeight, {
        isStatic: true,
        friction: 1 // Ground friction
    });
    World.add(world, ground);

    // Render setup
    Render.run(Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: 400,
            height: 400,
            wireframes: false // Show filled shapes
        }
    }));

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
            result = num2 !== 0 ? num1 / num2 : 0;
            count = Math.min(Math.round(result), 20); // Limit number of cubes for visibility
            break;
        case "sin":
        case "cos":
        case "tan":
            result = Math.abs(Math.round(Math.sin(num1 * (Math.PI / 180)) * 10));
            count = Math.min(result, 20); // Limit number of cubes for visibility
            break;
        case "power":
            result = Math.pow(num1, num2);
            count = Math.min(Math.round(result), 20); // Limit number of cubes for visibility
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
        cubes.push(cube);
    }
}

setup();
// Matter.js setup and previous functions...

function askQuestion() {
    const userInput = document.getElementById('user-input').value;
    const chatOutput = document.getElementById('chat-output');

    if (userInput.trim() === "") {
        return; // Do not send empty messages
    }

    const response = getResponse(userInput);
    
    // Display user input
    chatOutput.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
    // Display chatbot response
    chatOutput.innerHTML += `<div><strong>Chatbot:</strong> ${response}</div>`;
    document.getElementById('user-input').value = ''; // Clear input

    // Auto scroll to bottom
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

function getResponse(input) {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("add") || lowerInput.includes("+")) {
        return "To add two numbers, use the calculator above!";
    } else if (lowerInput.includes("subtract") || lowerInput.includes("-")) {
        return "To subtract two numbers, use the calculator above!";
    } else if (lowerInput.includes("multiply") || lowerInput.includes("*")) {
        return "To multiply two numbers, use the calculator above!";
    } else if (lowerInput.includes("divide") || lowerInput.includes("/")) {
        return "To divide two numbers, use the calculator above!";
    } else if (lowerInput.includes("sin")) {
        return "Use the sine function on the calculator for calculations.";
    } else if (lowerInput.includes("cos")) {
        return "Use the cosine function on the calculator for calculations.";
    } else if (lowerInput.includes("tan")) {
        return "Use the tangent function on the calculator for calculations.";
    } else if (lowerInput.includes("help")) {
        return "Ask about operations like add, subtract, multiply, divide, sin, cos, and tan!";
    } else {
        return "Sorry, I can't answer that. Try asking about math operations!";
    }
}

// Initialize the physics simulation and other functions
setup();

