var FileListBuilder = require('../classes/core/FileListBuilder');
var fileList = module.exports = new FileListBuilder();

fileList.add('image', ['background', 'assets/bg.jpg', null, null], 'boot');