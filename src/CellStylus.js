
function getStylus () {

    function drawCell (obj) {
        const { walls, cell_x, cell_y, size, ctx } = obj;
        // fill
        ctx.beginPath();
        ctx.rect(
            cell_x,
            cell_y,
            size,
            size
        );
        ctx.fill();
        // stroke
        if (walls.N === true) {
            ctx.beginPath();
            ctx.moveTo(
                cell_x,
                cell_y
            );
            ctx.lineTo(
                cell_x + size,
                cell_y
            );
            ctx.stroke();
        }
        if (walls.W === true) {
            ctx.beginPath();
            ctx.moveTo(
                cell_x,
                cell_y
            );
            ctx.lineTo(
                cell_x,
                cell_y + size
            );
            ctx.stroke();
        }
        if (walls.E === true) {
            ctx.beginPath();
            ctx.moveTo(
                cell_x + size,
                cell_y + size
            );
            ctx.lineTo(
                cell_x + size,
                cell_y
            );
            ctx.stroke();
        }
        if (walls.S === true) {
            ctx.beginPath();
            ctx.moveTo(
                cell_x + size,
                cell_y + size
            );
            ctx.lineTo(
                cell_x,
                cell_y + size
            );
            ctx.stroke();
        }
    }

    function drawArrow (obj) {
        const { arrow_direction, cell_x, cell_y, size, ctx } = obj;
        
        ctx.fillStyle = "#FF9900";
        ctx.beginPath();
        if (arrow_direction === "N") {
            ctx.moveTo(
                cell_x + size * 0.5,
                cell_y + size * 0.5
            );
            ctx.lineTo(
                cell_x + size * 0.6,
                cell_y + size * 0.85
            );
            ctx.lineTo(
                cell_x + size * 0.4,
                cell_y + size * 0.85
            );
        }
        if (arrow_direction === "E") {
            ctx.moveTo(
                cell_x + size * 0.5,
                cell_y + size * 0.5
            );
            ctx.lineTo(
                cell_x + size * 0.15,
                cell_y + size * 0.6
            );
            ctx.lineTo(
                cell_x + size * 0.15,
                cell_y + size * 0.4
            );
        }
        if (arrow_direction === "S") {
            ctx.moveTo(
                cell_x + size * 0.5,
                cell_y + size * 0.5
            );
            ctx.lineTo(
                cell_x + size * 0.4,
                cell_y + size * 0.15
            );
            ctx.lineTo(
                cell_x + size * 0.6,
                cell_y + size * 0.15
            );
        }
        if (arrow_direction === "W") {
            ctx.moveTo(
                cell_x + size * 0.5,
                cell_y + size * 0.5
            );
            ctx.lineTo(
                cell_x + size * 0.85,
                cell_y + size * 0.4
            );
            ctx.lineTo(
                cell_x + size * 0.85,
                cell_y + size * 0.6
            );
        }
        ctx.fill();
    }

    return {
        drawCell,
        drawArrow
    };
}

export default getStylus;