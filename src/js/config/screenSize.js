var documentElement = document.documentElement;
/* CHANGE YOUR SCREENSIZE SETTINGS
 * This boilerplate originally created to support mobile game and
 * fullscreen web game responsively without stretching.
 * The approach is fixing one of the measures (width or height) and
 * then set the other measure accordingly to keep the aspect ratio.
 *
 * This won't resize the canvas on window resize (device rotated).
 * TODO: Add auto resize functionality?
 *
 * As default, the height is fixed with FIXED_HEIGHT = 'Height'.
 * Set FIXED_HEIGHT = 'Width' to set width as the fixed measure.
*/
var FIXED_MEASURE = 'Height';
var FIXED_SIZE    = 600;

/** LOGIC PART */
/**
 * Name definitions
 * NOTICE: res is short for responsive
 */
var fixedName  = FIXED_MEASURE;
var resName    = fixedName === 'Height' ? 'Width' : 'Height';
var FIXED_NAME = fixedName.toUpperCase();
var RES_NAME   = resName.toUpperCase();
/** Measures of document */
var documentFixed = documentElement[`client${fixedName}`];
var documentRes   = documentElement[`client${resName}`];
var ratio         = documentRes / documentFixed;
/** Canvas measures */
var canvasFixed = FIXED_SIZE;
var canvasRes   = FIXED_SIZE * ratio;
/** document / game ratio */
var ratioFixed = documentFixed / canvasFixed;
var ratioRes   = documentRes / canvasRes;
/** Exports */
var screen = module.exports = {
	[`CANVAS_${FIXED_NAME}`] : canvasFixed,
	[`CANVAS_${RES_NAME}`]   : canvasRes,
	[`${FIXED_NAME}_RATIO`]  : ratioFixed,
	[`${RES_NAME}_RATIO`]    : ratioRes,
};
/* Fix for CocoonJS */
window.width  = navigator.isCocoonJS  ? window.innerWidth  : screen.CANVAS_WIDTH;
window.height = navigator.isCocoonJS  ? window.innerHeight : screen.CANVAS_HEIGHT;