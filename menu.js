import Button from './button.js'

export default class Menu {

    // the default values correspond to the styling of a context menu
    constructor(
        x,
        y,
        buttonData,
        width = 150,
        height = 35,
        bodyColor = '#f0f0f0',
        highlightedBodyColor = '#f0ffff',
        borderColor = '#000000',
        highlightedBorderColor = '#00a0a0',
        borderWidth = 2,
        radii = 5,
        textColor = '#000000',
        font = '15px monospace',
        isVertical = true
    ) {
        this.buttons = [];

        // a menu's location is the location of the first button in the buttons array
        this.x = x;
        this.y = y;
        // keep track of what buton is highlighted to avoid looping
        this.buttonHighlighted = null;

        for (const button of buttonData) {
            this.buttons.push(new Button(
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
                button.text,
                textColor,
                font,
                button.onMouseDown
            ));
            if (isVertical) {
                y += height;
            }
            else {
                x += width;
            }
        }
    }

    onMouseMoved(event) {
        this.buttonHighlighted = null;
        for (let button of this.buttons) {
            if (!this.buttonHighlighted) {
                button.isHighlighted = button.isPointInRect(event.x, event.y);
                // if we are hovering over a button, remember it
                if (button.isHighlighted) {
                    this.buttonHighlighted = button;
                }
            // if we already found the button we are hovering, deselect the rest
            } else {
                button.isHighlighted = false;
            }
        }
    }

    onMouseDown(event) {
        if (this.buttonHighlighted) {
            this.buttonHighlighted.onMouseDown();
            this.buttonHighlighted.isHighlighted = false;
            this.buttonHighlighted = null;
        }
    }

    render(renderer) {
        for (const button of this.buttons) {
            button.render(renderer);
        }
    };
};
