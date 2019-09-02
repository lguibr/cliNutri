const rl = require("./readline")

const constants = require("./../models/constants")

const exitString = constants.exitString
const returnMenuString = constants.returnMenuString

const mainMenu = require("./menu")

const helperRemember = () => {
	console.log("###############################")
	console.log(
		`Caso deseje encerrar o programa em qualquer momento basta digitar '${exitString}'`
	)
	console.log(
		`Caso deseje retornar ao menu principal em qualquer momento basta digitar '${returnMenuString}'`
	)
	console.log("############################### \n")
}

const clear = () => {
	// 1. Print empty lines until the screen is blank.
	process.stdout.write("\033[2J")
	// 2. Clear the scrollback.
	process.stdout.write("\u001b[H\u001b[2J\u001b[3J")
}

const simpleQuestion = stringQuestion => {
	helperRemember()
	return new Promise((resolve, reject) => {
		rl.question(`${stringQuestion}\n`, answer => {
			clear()
			console.log("############################### \n")

			if (answer == exitString) {
				rl.close()
			} else if (answer == returnMenuString) {
				console.log("Retornando para o Menu Principal \n")
				interface()
			} else {
				resolve(answer)
			}
		})
	})
}
var recursiveQuestion = (
	question,
	escapeString = "exit",
	arrayOfAnswers = []
) => {
	helperRemember()
	return new Promise((resolve, reject) => {
		rl.question(
			`${question} caso contrario digite '${escapeString}\n`,
			answer => {
				clear()

				console.log("############################### \n")
				if (answer == exitString) {
					rl.close()
				} else if (answer == returnMenuString) {
					console.log("Retornando para o Menu Principal \n")
					mainMenu(questionner)
				}

				if (answer == escapeString) return resolve(arrayOfAnswers)
				else {
					arrayOfAnswers.push(answer)

					resolve(
						recursiveQuestion(
							question,
							escapeString,
							arrayOfAnswers
						)
					)
				}
			}
		)
	})
}

const interface = async () => {
	console.log(`Bem vindo ao cliNutri \n`)

	await mainMenu({
		simpleQuestion: simpleQuestion,
		recursiveQuestion: recursiveQuestion
	})

	rl.close()
}

module.exports = {
	interface: interface
}
