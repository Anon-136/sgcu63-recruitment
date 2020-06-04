const fileSearch = require('./index')

const testObj = `
    {
        "FolderA": {
            "_files": [ "file1", "file2" ],
            "SubfolderC": {
                "_files": [ "file1" ]
            },
            "SubfolderB": {
                "_files" : [ "file1" ]
            }
        }
    }
`

const answers = [
	'/FolderA/file1',
	'/FolderA/SubfolderB/file1',
	'/FolderA/SubfolderC/file1',
]

const results = fileSearch('file1', testObj)
for (let i = 0; i < answers.length; i++) {
	console.assert(
		results[i] == answers[i],
		`index ${i}: expected "${answers[i]}" but got "${results[i]}"`
	)
}
