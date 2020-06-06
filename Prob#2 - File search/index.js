function depthFirstFileSearch(fileToSearch, curObj, curPath = '', depth = 0) {
	var fileList = []
	for (const key in curObj) {
		if (key == '_files') {
			for (const fileName of curObj[key]) {
				if (fileName == fileToSearch) {
					fileList.push({ path: `${curPath}/${fileName}`, depth })
				}
			}
		} else if (key[0] != '_') {
			const result = depthFirstFileSearch(
				fileToSearch,
				curObj[key],
				`${curPath}/${key}`,
				depth + 1
			)
			fileList = fileList.concat(result)
		}
	}
	return fileList
}

module.exports = function fileSearch(fileToSearch, filesObj) {
	const obj = JSON.parse(filesObj)
	const filesObjList = depthFirstFileSearch(fileToSearch, obj)
	filesObjList.sort((a, b) =>
		a.depth == b.depth ? a.path.localeCompare(b.path) : a.depth - b.depth
	)
	return filesObjList.map((fileObj) => fileObj.path)
}
