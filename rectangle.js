export default class Rectangle {
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
        isHighlighted
    ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.bodyColor = bodyColor
        this.selectedBodyColor = selectedBodyColor
        this.borderColor = borderColor
        this.selectedBorderColor = selectedBorderColor
        this.borderWidth = borderWidth
        this.radii = radii
        this.isHighlighted = isHighlighted
    }

    copyRectangle() {
        return new Rectangle(
            this.x,
            this.y,
            this.width,
            this.height,
            this.bodyColor,
            this.selectedBodyColor,
            this.borderColor,
            this.selectedBorderColor,
            this.borderWidth,
            this.radii,
            this.isHighlighted
        )
    }

    isPointInRect(x, y) {
        return (this.x <= x &&
                this.y <= y &&
                this.x + this.width >= x &&
                this.y + this.height >= y)
    }

    render(renderer) {
        // render the body of the rectangle
        renderer.beginPath()
        renderer.roundRect(
            this.x,
            this.y,
            this.width,
            this.height,
            this.radii)
        renderer.fillStyle = this.isHighlighted ? this.selectedBodyColor : this.bodyColor
        renderer.fill()
        // render the border of the rectangle
        renderer.strokeStyle = this.isHighlighted ? this.selectedBorderColor : this.borderColor
        renderer.lineWidth = this.borderWidth
        renderer.stroke()
    }
}
