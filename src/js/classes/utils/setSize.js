/**
 * Utitlty function to resize a Display Object
 * while keeping the aspect ratio
 * @param {Number} [Optional] width - the desired width
 * @param {Number} [Optional] height - the desired height
 * TODO: Move to an external repository for maintainance.
 */
export default function setSize(width, height){

	if (!isOK(width) && !isOK(height)) {
		throw Error('Width and Height cannot be null or undifined at the same time!');
	}

	this.scale.setTo(1, 1);

	var scaleWidth, scaleHeight;
	if (isOK(width)) scaleWidth  = width / this.width;
	if (isOK(height)) scaleHeight = height / this.height;

	this.scale.setTo(scaleWidth||scaleHeight, scaleHeight||scaleWidth);
};

function isOK(variable) {
	return variable !== null && typeof variable !== 'undefined';
}