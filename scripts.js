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
                if (num2 === 0) {
                    result = "Cannot divide by zero.";
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                result = "Unknown operation.";
        }
    }

    document.getElementById('result').textContent = "Result: " + result;
}
// Function to perform calculations
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
                if (num2 === 0) {
                    result = "Cannot divide by zero.";
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                result = "Unknown operation.";
        }
    }

    document.getElementById('result').textContent = "Result: " + result;
}

// Physics animation function
function animateCubes() {
    const canvas = document.getElementById('physicsCanvas');
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
        element: document.body,
        engine: engine,
        canvas: canvas
    });

    // Create a set of cubes
    const cubes = [];
    for (let i = 0; i < 5; i++) {
        const cube = Matter.Bodies.rectangle(Math.random() * 400, Math.random() * 200, 40, 40, {
            restitution: 0.7,
            render: {
                fillStyle: '#3498db'
            }
        });
        cubes.push(cube);
        Matter.World.add(engine.world, cube);
    }

    // Set a ground
    const ground = Matter.Bodies.rectangle(200, 390, 400, 20, { isStatic: true });
    Matter.World.add(engine.world, ground);

    // Start the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);
}
