class Pendulum {
    // Configurable properties
    angularOffset: number;
    mass: number;
    stringLength: number;

    // Non configurable properties
    damping: number;
    angularAcceleration: number;
    angularVelocity: number;
    angle: number;


    constructor(angularOffset: number, mass: number, stringLength: number) {
        this.angularOffset = angularOffset;
        this.mass = mass;
        this.stringLength = stringLength;

        this.damping = 0.95;
        this.angularAcceleration = 0;
        this.angularVelocity = 0;
        this.angle = angularOffset;
    }

    getUpdatedAngle = () => {
        this.angularAcceleration = (-1 * this.mass / this.stringLength) * Math.sin(this.angle);
        this.angularVelocity = (this.angularVelocity + this.angularAcceleration) * this.damping;
        this.angle += this.angularVelocity;  

        return this.angle;
    }
}

export { Pendulum };