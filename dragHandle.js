import Rectangle from './rectangle.js'

export default class DragHandle extends Rectangle {
    constructor(
        component,
        handleName
    ) {
        let x;
        let y;
        if (handleName === 'topLeft') {
            x = component.x;
            y = component.y;
        } else if (handleName === 'topRight') {
            x = component.x + component.width - 12;
            y = component.y;
        } else if (handleName === 'bottomLeft') {
            x = component.x;
            y = component.y + component.height - 12;
        } else if (handleName === 'bottomRight') {
            x = component.x + component.width - 12;
            y = component.y + component.height - 12;
        }

        super(
            x,
            y,
            12,
            12,
            '#8080f0',
            undefined,
            '#8080f0',
            undefined,
            0,
            0
        )

        this.component = component;
        this.handleName = handleName;
    }

    move(distanceX, distanceY) {
        // calculate the next width and height, so we can determine later
        // if we need to stop the user from resizing along a certain axis
        let nextX = this.component.x;
        let nextY = this.component.y;
        let nextWidth = this.component.width;
        let nextHeight = this.component.height;
        let nextDragHandles = {
            'topLeft': {
                x: this.component.dragHandles['topLeft'].x,
                y: this.component.dragHandles['topLeft'].y
            },
            'topRight': {
                x: this.component.dragHandles['topRight'].x,
                y: this.component.dragHandles['topRight'].y
            },
            'bottomLeft': {
                x: this.component.dragHandles['bottomLeft'].x,
                y: this.component.dragHandles['bottomLeft'].y
            },
            'bottomRight': {
                x: this.component.dragHandles['bottomRight'].x,
                y: this.component.dragHandles['bottomRight'].y
            }
        };
        nextDragHandles[this.handleName].x += distanceX;
        nextDragHandles[this.handleName].y += distanceY;

        // modify the top left corner and component width and height
        if (this.handleName === 'topLeft') {
            nextX += distanceX;;
            nextY += distanceY;
            nextWidth -= distanceX;
            nextHeight -= distanceY;
            nextDragHandles['topRight'].y += distanceY;
            nextDragHandles['bottomLeft'].x += distanceX
        // modify the top right corner and component width and height
        } else if (this.handleName === 'topRight') {
            nextY += distanceY;
            nextWidth += distanceX;
            nextHeight -= distanceY;
            nextDragHandles['topLeft'].y += distanceY;
            nextDragHandles['bottomRight'].x += distanceX;
        // modify the bottom left corner and component width and height
        } else if (this.handleName === 'bottomLeft') {
            nextX += distanceX;
            nextWidth -= distanceX;
            nextHeight += distanceY;
            nextDragHandles['topLeft'].x += distanceX;
            nextDragHandles['bottomRight'].y += distanceY;
        // modify the bottom right corner and component width and height
        } else if (this.handleName === 'bottomRight') {
            nextWidth += distanceX;
            nextHeight += distanceY;
            nextDragHandles['topRight'].x += distanceX;
            nextDragHandles['bottomLeft'].y += distanceY;
        }
        // if this component can still be resized along the x axis
        if (nextWidth >= window.UNIT_SIZE * 4) {
            // resize the component and drag the drag handles
            this.component.x = nextX;
            this.component.width = nextWidth;
            for (let [name, handle] of Object.entries(nextDragHandles)) {
                this.component.dragHandles[name].x = handle.x;
            }
        }
        // if this component can still be resized along the y axis
        if (nextHeight >= window.UNIT_SIZE * 4) {
            // resize the component and drag the drag handles
            this.component.y = nextY;
            this.component.height = nextHeight;
            for (let [name, handle] of Object.entries(nextDragHandles)) {
                this.component.dragHandles[name].y = handle.y;
            }
        }
    }
}
