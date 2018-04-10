export const drawRect = (ctx, x1, y1, x2, y2, color, fill) => {
	if (fill === undefined) fill = true;
	ctx.save();
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x1, y2);
	ctx.closePath();
	if (fill) ctx.fill();
	ctx.stroke();
	ctx.restore();
};

export const drawShape = (ctx, points, color, fill) => {
	if (points.length < 3) return;
	if (fill === undefined) fill = true;
	ctx.save();
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	for (var i = 1; i < points.length; i++) {
		ctx.lineTo(points[i].x, points[i].y);
	}
	ctx.closePath();
	if (fill) ctx.fill();
	ctx.stroke();
	ctx.restore();
};

const drawText = (ctx, x, y, text, color, font) => {
	if (font === undefined) font = "20 pt Arial";
	ctx.save();
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
	ctx.restore();
};

const measureText = (ctx, x, y, text, font) => {
	if (font === undefined) font = "20 pt Arial";
	ctx.save();
	ctx.font = font;
	var result = ctx.measureText(text, x, y);
	ctx.restore();
	return result;
};

export const drawCenteredText = (ctx, x1, y1, x2, y2, text, color, font) => {
	var width = measureText(ctx, 0, 0, text, font).width;
	var centerX = x1 + (x2 - x1) / 2;
	centerX -= width / 2;
	var centerY = y1 + (y2 - y1) / 2;
	drawText(ctx, centerX, centerY, text, color, font);
};