import Button from './button.js'
import Rectangle from './rectangle.js'

export default class Component extends Button {
    constructor(
        x,
        y,
        text,
        width = window.UNIT_SIZE * 4,
        height = window.UNIT_SIZE * 4,
        bodyColor = '#a0a0a0',
        highlightedBodyColor = '#a0f0f0',
        borderColor = '#000000',
        highlightedBorderColor = '#8080f0',
        borderWidth = 4,
        radii = 12,
        textColor = '#000000',
        font = 'bold 20px monospace'
    ) {
        // send the majority of the data to the button class
        super(
            x,
            y,
            width,
            height,
            bodyColor,
            highlightedBodyColor,
            borderColor,
            highlightedBorderColor,
            borderWidth,
            radii,
            text,
            textColor,
            font
        )

        this.createDragHandles()
    }

    copyComponent() {
        return new Component(
            this.x,
            this.y,
            this.text,
            this.width,
            this.height,
            this.bodyColor,
            this.highlightedBodyColor,
            this.borderColor,
            this.highlightedBorderColor,
            this.borderWidth,
            this.radii,
            this.textColor,
            this.font
        );
    }

    snapToGrid() {
        super.snapDimensions();
        this.createDragHandles();
    }

    createDragHandles() {
        this.dragHandles = [
            this.createDragHandle(this.x, this.y),
            this.createDragHandle(this.x + this.width, this.y),
            this.createDragHandle(this.x, this.y + this.height),
            this.createDragHandle(this.x + this.width, this.y + this.height)
        ]
    }

    createDragHandle(x, y) {
        return new Rectangle(
            // center the drag handle
            x - 6,
            y - 6,
            12,
            12,
            '#8080f0',
            undefined,
            '#8080f0',
            undefined,
            0,
            0
        )
    }

    move(distanceX, distanceY) {
        this.x += distanceX
        this.y += distanceY
        for (let dragHandle of this.dragHandles) {
            dragHandle.x += distanceX
            dragHandle.y += distanceY
        }
    }

    moveHandle(handleDragging, distanceX, distanceY) {
        let component = handleDragging.component

        // calculate the next width and height, so we can determine later
        // if we need to stop the user from resizing along a certain axis
        let nextX = component.x
        let nextY = component.y
        let nextWidth = component.width
        let nextHeight = component.height
        let nextDragHandles = [
            {x: component.dragHandles[0].x, y: component.dragHandles[0].y},
            {x: component.dragHandles[1].x, y: component.dragHandles[1].y},
            {x: component.dragHandles[2].x, y: component.dragHandles[2].y},
            {x: component.dragHandles[3].x, y: component.dragHandles[3].y}
        ]
        nextDragHandles[handleDragging.handleIndex].x += distanceX
        nextDragHandles[handleDragging.handleIndex].y += distanceY

        // modify the top left corner and component width and height
        if (handleDragging.handleIndex === 0) {
            nextX += distanceX
            nextY += distanceY
            nextWidth -= distanceX
            nextHeight -= distanceY
            nextDragHandles[1].y += distanceY
            nextDragHandles[2].x += distanceX
        // modify the top right corner and component width and height
        } else if (handleDragging.handleIndex === 1) {
            nextY += distanceY
            nextWidth += distanceX
            nextHeight -= distanceY
            nextDragHandles[0].y += distanceY
            nextDragHandles[3].x += distanceX
        // modify the bottom left corner and component width and height
        } else if (handleDragging.handleIndex === 2) {
            nextX += distanceX
            nextWidth -= distanceX
            nextHeight += distanceY
            nextDragHandles[0].x += distanceX
            nextDragHandles[3].y += distanceY
        // modify the bottom right corner and component width and height
        } else if (handleDragging.handleIndex === 3) {
            nextWidth += distanceX
            nextHeight += distanceY
            nextDragHandles[1].x += distanceX
            nextDragHandles[2].y += distanceY
        }
        // if this component can still be resized along the x axis
        if (nextWidth >= window.UNIT_SIZE * 4) {
            // resize the component and drag the drag handles
            component.x = nextX
            component.width = nextWidth
            for (let i = 0; i < nextDragHandles.length; i++) {
                component.dragHandles[i].x = nextDragHandles[i].x
            }
        }
        // if this component can still be resized along the y axis
        if (nextHeight >= window.UNIT_SIZE * 4) {
            // resize the component and drag the drag handles
            component.y = nextY
            component.height = nextHeight
            for (let i = 0; i < nextDragHandles.length; i++) {
                component.dragHandles[i].y = nextDragHandles[i].y
            }
        }
    }

    resetDimensions() {
        // center the new rectangle in the old one
        let newX = this.x + this.width / 2 - window.UNIT_SIZE * 2;
        let newY = this.y + this.height / 2 - window.UNIT_SIZE * 2;
        this.x = newX
        this.y = newY
        this.width = window.UNIT_SIZE * 4;
        this.height = window.UNIT_SIZE * 4;
        // create new drag handles in place
        this.createDragHandles()
    }


    render(renderer) {
        super.render(renderer)
        // render the drag handles for this component if this component is selected
        if (this.isHighlighted) {
            for (let dragHandle of this.dragHandles) {
                dragHandle.render(renderer)
            }
        }
    }
};
