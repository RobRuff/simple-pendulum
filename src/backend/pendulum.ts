// Make singleton and hold reference in index.ts
class Pendulum {
    // These are currently public make them private after
    
    // Configurable properties
    angularOffset: number;
    mass: number;
    stringLength: number;
    coordinates: number[];

    // Non configurable properties
    damping: number;
    gravity: number;    
    createdAt: number;
    angularAcceleration: number;
    angularVelocity: number;
    angle: number;
    radius: number;


    constructor(angularOffset: number, mass: number, stringLength: number, coordinates: number[]) {
        this.angularOffset = angularOffset;
        this.mass = mass;
        this.stringLength = stringLength;
        this.coordinates = coordinates;

        this.createdAt = Date.now();
        this.damping = 0.995 - 0.0003 * this.mass / 3;
        this.gravity = 9.82;
        this.angularAcceleration = 0;
        this.angularVelocity = 0;
        this.angle = angularOffset;
        this.radius = 10;
    }

    getUpdatedCoordinates = () => {
        this.angularAcceleration = (-1 * this.gravity / this.radius) * Math.sin(this.angle);
        this.angularVelocity = (this.angularVelocity + this.angularAcceleration) * this.damping;
        this.angle += this.angularVelocity;  

        return [this.stringLength * Math.sin(this.angle),  this.stringLength * Math.cos(this.angle)];
    }
}

export { Pendulum };