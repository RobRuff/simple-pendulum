class Pendulum {
    angularOffset: number;
    mass: number;
    stringLength: number;
    radius: number;

    constructor(angularOffset: number, mass: number, stringLength: number) {
        this.angularOffset = angularOffset;
        this.mass = mass;
        this.stringLength = stringLength;
        this.radius = mass * 4;
    }

    drawPendulumObject = (element: HTMLCanvasElement) => {
        const ctx = element.getContext('2d');

        if (!ctx) {
        return;
        }
        
        //Rope
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(0,0);
        ctx.lineTo(0, this.stringLength);
        ctx.closePath();
        ctx.strokeStyle = '#a29376';
        ctx.stroke();
        
        //Bottom Circle
        ctx.beginPath();
        ctx.arc(0,this.stringLength + this.radius,this.radius,0,Math.PI);
        ctx.fillStyle = '#828386';
        ctx.fill();
        
        //Top Circle
        ctx.beginPath();
        ctx.arc(0,this.stringLength + this.radius,this.radius,Math.PI, 0);
        ctx.fillStyle = '#939598';
        ctx.fill();
        
        //Smooth Shading
        ctx.beginPath();
        ctx.bezierCurveTo(-this.radius, this.stringLength - 1 + this.radius, 0, this.stringLength + (1.5*this.radius), this.radius, this.stringLength - 1 + this.radius);
        ctx.fill();
    };
      
    draw = (angle: number) => {
        var element = document.getElementById('canvas') as HTMLCanvasElement;
        var ctx = element!.getContext('2d')!;
        
        ctx.setTransform(1,0,0,1,element.width*0.5,0);
        ctx.clearRect(-element.width*0.5,0,element.width,element.height);
        ctx.rotate(angle);
        
        this.drawPendulumObject(element);
    }
}

export { Pendulum };