const rl = require("./readline")
const constants = require("./../models/constants")

const exitString = constants.exitString
const returnMenu = constants.returnMenu

const simpleQuestion = stringQuestion => {
	return new Promise((resolve, reject) => {
		rl.question(`${stringQuestion}\n`, answer => {
			if (answer == exitString) {
				rl.close()
			} else if (answer == returnMenu) {
				console.log("Retornando para o Menu Principal \n")
				mainMenu()
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
	return new Promise((resolve, reject) => {
		rl.question(
			`${question} caso contrario digite '${escapeString}\n`,
			function(answer) {
				if (answer == exitString) {
					rl.close()
				} else if (answer == returnMenu) {
					console.log("Retornando para o Menu Principal \n")
					mainMenu()
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

module.exports = {
	recursiveQuestion: recursiveQuestion,
	simpleQuestion: simpleQuestion
}
