import Rectangle from './rectangle.js'

export default class Button extends Rectangle {
    constructor(
        x,
        y,
        width,
        height,
        bodyColor,
        selectedBodyColor,
        borderColor,
        selectedBorderColor,
        borderWidth,
        radii,
        text,
        textColor,
        font,
        onMouseDown
    ) {
        super(
            x,
            y,
            width,
            height,
            bodyColor,
            selectedBodyColor,
            borderColor,
            selectedBorderColor,
            borderWidth,
            radii,
            false
        )

        this.text = text
        this.textColor = textColor
        this.font = font
        this.onMouseDown = onMouseDown
    }

    render(renderer) {
        // render the rectangle
        super.render(renderer)

        renderer.beginPath()
        renderer.fillStyle = this.textColor
        renderer.font = this.font
        renderer.textAlign = 'center'
        renderer.textBaseline = 'middle'

        // render the button text
        renderer.fillText(
            this.text,
            // draw the text in the center of the rectangle
            this.x + this.width / 2,
            this.y + this.height / 2,
            // leave the text some horizontal room to breathe
            this.width * 3 / 4)
    }
}
