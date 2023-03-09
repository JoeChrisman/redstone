export default class Rectangle {
    constructor(
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
        isHighlighted
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.bodyColor = bodyColor;
        this.highlightedBodyColor = highlightedBodyColor;
        this.borderColor = borderColor;
        this.highlightedBorderColor = highlightedBorderColor;
        this.borderWidth = borderWidth;
        this.radii = radii;
        this.isHighlighted = isHighlighted;
    }

    copyRectangle() {
        return new Rectangle(
            this.x,
            this.y,
            this.width,
            this.height,
            this.bodyColor,
            this.highlightedBodyColor,
            this.borderColor,
            this.highlightedBorderColor,
            this.borderWidth,
            this.radii,
            this.isHighlighted
        );
    }

    isPointInRect(x, y) {
        return (this.x <= x &&
                this.y <= y &&
                this.x + this.width >= x &&
                this.y + this.height >= y);
    }

    render(renderer) {
        // render the body of the rectangle
        renderer.beginPath();
        renderer.roundRect(
            this.x,
            this.y,
            this.width,
            this.height,
            this.radii);
        renderer.fillStyle = this.isHighlighted ? this.highlightedBodyColor : this.bodyColor;
        renderer.fill();
        // render the border of the rectangle
        renderer.strokeStyle = this.isHighlighted ? this.highlightedBorderColor : this.borderColor;
        renderer.lineWidth = this.borderWidth;
        renderer.stroke();
    }
}
