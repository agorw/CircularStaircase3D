class CircularStaircase3D {
    constructor() {
        this.stepWidth = 60;
        this.stepHeight = 25;
        this.stairWidth = 0;
        this.stairHeight = 240;
        this.numberOfSteps = 0;
        this.steps = [];
    }

    setStepWidth(width) {
        if (width <= 60) {
            this.stepWidth = width;
        } else {
            throw new Error("Step width cannot be greater than 60cm.");
        }
    }

    setStepHeight(height) {
        if (height <= 25) {
            this.stepHeight = height;
        } else {
            throw new Error("Step height cannot be greater than 25cm.");
        }
    }

    setStairWidth(width) {
        this.stairWidth = width;
    }

    setStairHeight(height) {
        if (height <= 240) {
            this.stairHeight = height;
        } else {
            throw new Error("Stair height cannot be greater than 240cm.");
        }
    }

    calculateNumberOfSteps() {
        this.numberOfSteps = this.stairHeight / this.stepHeight;
    }

    createSteps() {
        for (let i = 0; i < this.numberOfSteps; i++) {
            let x = this.stairWidth * Math.cos(2 * Math.PI * i / this.numberOfSteps);
            let y = this.stairWidth * Math.sin(2 * Math.PI * i / this.numberOfSteps);
            let z = i * this.stepHeight;
            let step = { x: x, y: y, z: z };
            this.steps.push(step);
        }
    }

    displayStaircase() {
        // Create a scene
        let scene = new THREE.Scene();

        // Create a camera
        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 10;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        // Create a renderer
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create the steps of the staircase
        for (let i = 0; i < this.numberOfSteps; i++) {
            let geometry = new THREE.BoxGeometry(this.stepWidth, this.stepHeight, 1);
            let material = new THREE.MeshLambertMaterial({ color: 0xffffff });
            let step = new THREE.Mesh(geometry, material);
            step.position.set(this.steps[i].x, this.steps[i].y, this.steps[i].z);
            scene.add(step);
        }

        // Create a light
        let light = new THREE.PointLight(0xffff00, 1, 100);
        light.position.set(0, 0, 10);
        scene.add(light);

        // Render the scene
        renderer.render(scene, camera);
    }

    getNumberOfSteps() {
        return this.numberOfSteps;
    }
}