/* Depth First Search Algorithm :
 * 	 Look through the directory,
 * 	 search the file in the current folder,
 *	 then recursively search each sub folder.
 * Return : a list of file path and file depth
 */
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

/*
 * Convert json to object
 * Search all the file path
 * Sort by depth and alphabetical order
 * Return : a list of path
 */
module.exports = function fileSearch(fileToSearch, filesObj) {
	const obj = JSON.parse(filesObj)
	const filePathList = depthFirstFileSearch(fileToSearch, obj)
	filePathList.sort((a, b) =>
		a.depth == b.depth ? a.path.localeCompare(b.path) : a.depth - b.depth
	)
	return filePathList.map((fileObj) => fileObj.path)
}
