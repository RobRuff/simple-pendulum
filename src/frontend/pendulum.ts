class Pendulum {
    _index: number;
    _radius: number;
    _angularOffset: number;
    _mass: number;
    _stringLength: number;

    constructor(index: number, angularOffset: number, mass: number, stringLength: number) {
        this._index = index;
        this._angularOffset = angularOffset;
        this._mass = mass;
        this._stringLength = stringLength;
        this._radius = mass * 4;
    }

    get angularOffset() {
        return this._angularOffset;
    }
    
    set angularOffset(val: number) { 
        this._angularOffset = val;
    }

    get mass() {
        return this._mass;
    }
    
    set mass(val: number) { 
        this._mass = val
        this._radius = this._mass * 4;
    }

    get stringLength() {
        return this._stringLength;
    }
    
    set stringLength(val: number) { 
        this._stringLength = val
    }

    drawPendulumObject = (element: HTMLCanvasElement) => {
        const ctx = element.getContext('2d');

        if (!ctx) {
        return;
        }
        
        //String
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(0,0);
        ctx.lineTo(0, this.stringLength);
        ctx.closePath();
        ctx.strokeStyle = '#a29376';
        ctx.stroke();
        
        //Bottom Circle
        ctx.beginPath();
        ctx.arc(0,this.stringLength + this._radius,this._radius,0,Math.PI);
        ctx.fillStyle = '#828386';
        ctx.fill();
        
        //Top Circle
        ctx.beginPath();
        ctx.arc(0,this.stringLength + this._radius,this._radius,Math.PI, 0);
        ctx.fillStyle = '#939598';
        ctx.fill();
        
        //Smooth Shading
        ctx.beginPath();
        ctx.bezierCurveTo(-this._radius, this.stringLength - 1 + this._radius, 0, this.stringLength + (1.5*this._radius), this._radius, this.stringLength - 1 + this._radius);
        ctx.fill();
    };
      
    draw = (angle: number) => {
        var element = document.getElementById('canvas') as HTMLCanvasElement;
        var ctx = element!.getContext('2d')!;

        const translationMap = [0.5, 0.25, 0.75, 0.125, 0.875];        
        ctx.setTransform(1,0,0,1,element.width*translationMap[this._index - 1],0);
        ctx.rotate(angle);
        
        this.drawPendulumObject(element);
    }

    clearCanvas = () => {
        var element = document.getElementById('canvas') as HTMLCanvasElement;
        var ctx = element!.getContext('2d')!;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, element.width, element.height);
        ctx.restore();
    }
}

export { Pendulum };