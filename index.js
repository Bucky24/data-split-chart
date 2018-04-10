import React from 'react';
import { drawRect, drawCenteredText } from './draw';

function getDataAsLayers(graphData) {
	return getDataAsLayersHelper(graphData, 1, null);
}

function getDataAsLayersHelper(object, layer, parent) {
	var result = {};
	var newObject = _extends({}, object, {
		parentId: parent
	});
	result[layer] = [newObject];
	if (!object.children) {
		return result;
	}
	object.children.forEach(function (child) {
		var childResult = getDataAsLayersHelper(child, layer + 1, object.id);
		Object.keys(childResult).forEach(function (key) {
			result[key] = [].concat(_toConsumableArray(result[key] || []), _toConsumableArray(childResult[key]));
		});
	});

	if (result[layer + 1]) {
		var amount = result[layer + 1].reduce(function (amount, obj) {
			return amount + obj.amount;
		}, 0);
		newObject.amount = amount;
	}

	return result;
}

class Chart extends React.Component {
	draw() {
		const ctx = this.canvas.getContext("2d");
		drawRect(ctx, 0, 0, this.canvas.width, this.canvas.height, "#fff", true);

		const layers = getDataAsLayers(this.props.data);

		const spaceBetween = 30;
		// 30 for padding
		const height = canvas.height - spaceBetween;
		const totalAmount = layers[1][0].amount;

		const layerKeys = Object.keys(layers);
		const highestLayerId = -1;
		const highestLayerCount = 0;
		// find layer with most entries
		layerKeys.forEach((key) => {
			if (layers[key].length > highestLayerCount) {
				highestLayerCount = layers[key].length;
				highestLayerId = key;
			}
		});
		const totalSpace = layers[highestLayerId].length * spaceBetween;
		const spaceLeftForData = height - totalSpace;
		const pixelsPerData = spaceLeftForData / totalAmount;

		// 30 for padding
		const width = canvas.width - spaceBetween;
		const widthPerLayer = width / layerKeys.length;
		const widthForData = widthPerLayer - spaceBetween;

		const positionsByCategory = {};
		const categoryAggregateAmount = {};

		layerKeys.forEach((layer, index) => {
			const x = widthPerLayer * index + spaceBetween;
			let offset = spaceBetween;
			layers[layer].forEach((obj) => {
				var objHeight = pixelsPerData * obj.amount;

				drawRect(ctx, x, offset, x + widthForData, offset + objHeight, obj.color, true);
				drawCenteredText(ctx, x, offset, x + widthForData, offset + objHeight, obj.name, "#000", "12px Arial");
				drawCenteredText(ctx, x, offset + 20, x + widthForData, offset + objHeight, '$' + obj.amount, "#000", "12px Arial");

				if (!categoryAggregateAmount[obj.parentId]) {
					categoryAggregateAmount[obj.parentId] = 0;
				}
				const existingAmount = categoryAggregateAmount[obj.parentId];

				positionsByCategory[obj.id] = {
					x1: x,
					x2: x + widthForData,
					y1: offset,
					y2: offset + objHeight,
					obj,
					displaysAtAmount: existingAmount
				};
				categoryAggregateAmount[obj.parentId] += obj.amount;

				offset += objHeight + spaceBetween;
			});
		});

		Object.keys(positionsByCategory).forEach((categoryId) => {
			const positionObj = positionsByCategory[categoryId];
			const { obj, x1, x2, y1, y2, displaysAtAmount } = positionObj;
			// if no parent ID, no lines!

			if (!obj.parentId) {
				return;
			}
			const parentObj = positionsByCategory[obj.parentId];
			const startAmount = displaysAtAmount;
			const endAmount = startAmount + obj.amount;

			const startY = parentObj.y1 + startAmount * pixelsPerData;
			const endY = parentObj.y1 + endAmount * pixelsPerData;

			drawShape(ctx, [
				{ x: parentObj.x2 + 1, y: startY }, 
				{ x: x1, y: y1 }, { x: x1, y: y2 }, 
				{ x: parentObj.x2 + 1, y: endY }
			], obj.color, true);
		});

		drawRect(ctx, 0, 0, canvas.width, canvas.height, "#000", false);
	}
	
	render() {
		return (<canvas ref={(c) => {
			this.canvas = c;
			this.draw();
		 }}>No canvas for you</canvas>);
	}
};

export default Canvas;