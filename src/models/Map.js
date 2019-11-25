const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

class Map {
    constructor(length, values) {
        this.hexagonLength = length;
        this.map = values
    }

    expand(direction, value) {
        switch(direction) {
            case TOP:
                let row = new Array(this.map[0].length);
                row.fill(value);
                this.map.unshift(row); 
                break;
            case RIGHT: 
                this.map = this.map.map(x => [...x, value]);
                break;
            case BOTTOM: 
                row = new Array(this.map[0].length);
                row.fill(value);
                this.map.push(row); 
                break;
            case LEFT: 
                this.map = this.map.map(x => [value, ...x]);
                break;
        }
    }

    shrink(direction) {
        switch(direction) {
            case TOP:
                if (this.map.length > 0) this.map.shift(); 
                break;
            case RIGHT: 
                if (this.map[0].length > 0) this.map = this.map.map(x => x.pop());
                break;
            case BOTTOM:
                if (this.map.length > 0) this.map.pop(); 
                break;
            case LEFT: 
                if (this.map[0].length > 0) this.map = this.map.map(x => x.shift());
                break;
        }
    }

    fixMap(surroundValue) {
        for (let i=1; i<this.map.length-1; i++) {
            for (let j=1; j<this.map[i].length-1; j++) {
                if (this.map[i][j].type != 0 && this.map[i][j].type != 9) { // NodeType.Empty && NodeType.Next
                    if (this.map[i-1][j].type == 0) this.map[i-1].splice(j, 1, surroundValue);
                    if (this.map[i][j-1].type == 0) this.map[i].splice(j-1, 1, surroundValue);
                    if (this.map[i+1][j].type == 0) this.map[i+1].splice(j, 1, surroundValue);
                    if (this.map[i][j+1].type == 0) this.map[i].splice(j+1, 1, surroundValue);
                    if (this.map[i-1][j+1].type == 0) this.map[i-1].splice(j+1, 1, surroundValue);
                    if (this.map[i+1][j-1].type == 0) this.map[i+1].splice(j-1, 1, surroundValue);
                }
            }
        }
    }

    setValue(value, coord, surroundValue, defaultValue) {
        this.map[coord.y].splice(coord.x, 1, value);
        if (coord.y == 0) {
            this.expand(TOP, defaultValue);
        } else if (coord.y == this.map.length-1) {
            this.expand(BOTTOM, defaultValue);
        }

        if (coord.x == 0) {
            this.expand(LEFT, defaultValue);
        } else if (coord.x == this.map[0].length-1) {
            this.expand(RIGHT, defaultValue);
        }

        this.fixMap(surroundValue);
    }

    removeValue(value, coord, surroundValue, defaultValue) {
        this.map[coord.y].splice(coord.x, 1, value);
        
        const i = coord.y; const j = coord.x;
        if (i>0 && this.map[i-1][j].type == 9) this.map[i-1].splice(j, 1, defaultValue);
        if (j>0 && this.map[i][j-1].type == 9) this.map[i].splice(j-1, 1, defaultValue);
        if (i<this.map.length-1 && this.map[i+1][j].type == 9) this.map[i+1].splice(j, 1, defaultValue);
        if (j<this.map[0].length-1 && this.map[i][j+1].type == 9) this.map[i].splice(j+1, 1, defaultValue);
        if (i>0 && j<this.map[0].length-1 && this.map[i-1][j+1].type == 9) this.map[i-1].splice(j+1, 1, defaultValue);
        if (j>0 && i<this.map.length-1 && this.map[i+1][j-1].type == 9) this.map[i+1].splice(j-1, 1, defaultValue);

        this.fixMap(surroundValue);
    }

    getSize() {
        const r = this.map.length;
        const c = this.map[0].length;
        const L = this.hexagonLength;
        const A = 60/180 * Math.PI;

        return {
            height: Math.round( (r*2*L*Math.sin(A)) + ((c-1)*L*Math.sin(A)) ),
            width: (c*L) + ((c+1)*(L/2))
        };
    }

    getCoordinate(i, j) {
        const L = this.hexagonLength;
        const A = 60/180 * Math.PI;
        const margin = 6;

        return {
            y: Math.round( (i*2*L*Math.sin(A)) + (j*L*Math.sin(A)) ) * 1.2, 
            x: ((j*L) + ((j+1)*L/2)) * 1.1
        };
    }

    print() {
        console.log(this.map);
    }
}

export default Map;