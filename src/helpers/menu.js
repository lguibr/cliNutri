const constants = require("./../models/constants")

const exitString = constants.exitString
const returnMenuString = constants.returnMenuString

const clients = require("./clients")
const comiteMenus = require("./comiteMenus")

const mainMenu = async questionner => {
	console.log("\n ## Menu Principal ## \n")

	const welcomeQuestion = await questionner.simpleQuestion(
		"Escolha a opção desejada, digite \n 1 para Clientes, \n 2 para Consultas, \n 3 para Cardapios"
	)

	if (welcomeQuestion == 1) {
		await clients.clientsMap(questionner)
	} else if (welcomeQuestion == 2) {
		console.log("\n ## Consultas ## \n")
	} else if (welcomeQuestion == 3) {
		await comiteMenus.comiteMenusMap(questionner)
	} else {
		console.log("Opção invalida por favor tente novamente")
		await mainMenu(questionner)
	}
	await mainMenu(questionner)
}

module.exports = mainMenu
