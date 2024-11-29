import { Rectangle } from './rectangle';

export class Square extends Rectangle {
    constructor(sideLength, size, color, positionType = 'inner', texture) {
        super(sideLength, sideLength, size, color, positionType, texture);
    }
}
