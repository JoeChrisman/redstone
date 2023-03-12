import Button from './button.js'
import Rectangle from './rectangle.js'
import DragHandle from './dragHandle.js'

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

        this.isDefaultComponent = (
            text === 'NOT' ||
            text === 'AND' ||
            text === 'OR' ||
            text === 'XOR');
        this.snapToGrid()
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
        )
    }

    snapToGrid() {
        super.snapToGrid();
        this.createDragHandles();
    }

    createDragHandles() {
        this.dragHandles = {
            'topLeft': new DragHandle(this, 'topLeft'),
            'topRight': new DragHandle(this, 'topRight'),
            'bottomLeft': new DragHandle(this, 'bottomLeft'),
            'bottomRight': new DragHandle(this, 'bottomRight')
        }
    }

    move(distanceX, distanceY) {
        this.x += distanceX
        this.y += distanceY
        for (let dragHandle of Object.values(this.dragHandles)) {
            dragHandle.x += distanceX
            dragHandle.y += distanceY
        }
    }

    resetDimensions() {
        // center the new rectangle in the old one
        let newX = this.x + this.width / 2 - window.UNIT_SIZE * 2;
        let newY = this.y + this.height / 2 - window.UNIT_SIZE * 2;
        this.x = newX;
        this.y = newY;
        this.width = window.UNIT_SIZE * 4;
        this.height = window.UNIT_SIZE * 4;
        this.snapToGrid();
    }


    render(renderer) {
        super.render(renderer);
        // render the drag handles for this component if this component is selected
        if (this.isHighlighted) {
            for (const dragHandle of Object.values(this.dragHandles)) {
                dragHandle.render(renderer);
            }
        }
    }
}
