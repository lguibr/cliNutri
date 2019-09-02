const util = require("util"),
	process = require("child_process"),
	main = process.exec("node app/main.js")

const guideCreateUser = [
	"1\n",
	"1\n",
	"Nome Usuario\n",
	"Rua do Novo Usuario, XXX \n",
	" +55 32153215 \n",
	" example@example.com.br \n",
	" 04/05/1992 \n",
	" arroz \n",
	" ovo \n",
	"N\n"
]
const runGuide = guide => {
	guide.forEach((line, i) => {
		setTimeout(() => {
			main.stdin.write(line)
		}, 500 * i)
	})
}

runGuide(guideCreateUser)



main.stdout.on("data", function(data) {
	console.log(data.toString())
})
