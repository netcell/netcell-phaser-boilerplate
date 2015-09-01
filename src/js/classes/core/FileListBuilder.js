export default class FileListBuiler {
	constructor () {
		this.files = [];
		this.ninePatches = [];
	}
	get fileList () {
		var fileList = [];
		this.files.forEach(file => {
			file.src && fileList.push(file.src);
			file.dataSrc && fileList.push(file.dataSrc);
		});
		return fileList;
	}
	/**
	 * Add a file to the list
	 * @param {String} type - The method name of game.load would be called
	 * @param {Array} params - The arguments of game.load[type]
	 * @param {String} loadAt - List of state to load the file, seperated by comma `,`. Default is `preload`
	 */
	add(type, params, loadAt = 'preload') {
		loadAt = loadAt.replace(/ /g,'').split(',');
		this.files.push({ type, params, loadAt });
	}
	/**
	 * Load the file from the list
	 * @param  {Phaser.Game} game
	 */
	load (game){
		var state = game.state.current;
		this.files
		.filter(file => file.loadAt.indexOf(state) >= 0)
		.forEach(file => game.load[file.type](...file.params))
	}
	/** Similar to file list but for nine patch */
	ninePatch(params, loadAt = 'preload'){
		loadAt = loadAt.replace(/ /g,'').split(',');
		this.ninePatches.push({ params, loadAt });
	}
	loadNinePatch (game){
		var state = game.state.current;
		this.ninePatches
		.filter(file => file.loadAt.indexOf(state) >= 0)
		.forEach(file => game.cache.addNinePatch(...file.params))
	}
}