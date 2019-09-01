var util = require("util"),
	process = require("child_process"),
	main = process.exec("node src/main.js")

main.stdin.write("200\n")

main.stdout.on("data", function(data) {
	console.log(data.toString())
})
