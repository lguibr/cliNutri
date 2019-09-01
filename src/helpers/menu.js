//General handle menu
const rl = require("./readline")
const mealsBuilder = require("./mealsBuilder")
const clients = require("./clients")
const questionner = require("./questionner")
const constants = require("./../models/constants")

const exitString = constants.exitString
const returnMenu = constants.returnMenu

const mainMenu = async () => {
	console.log(
		`Caso deseje encerrar o programa em qualquer momento basta digitar '${exitString}' \n`
	)
	console.log(
		`Caso deseje retornar ao menu principal em qualquer momento basta digitar '${returnMenu}' \n`
	)
	console.log("\n ## Menu Principal ## \n")

	const welcomeQuestion = await questionner.simpleQuestion(
		"Escolha a opção desejada, digite \n 1 para Clientes, \n 2 para Consultas, \n 3 para cardapios"
	)

	if (welcomeQuestion == 1) {
		console.log("welcome 1")
		await clients.clientsMap()
	} else if (welcomeQuestion == 2) {
		console.log("welcome 2")
		console.log("\n ## Consultas ## \n")
	} else if (welcomeQuestion == 3) {
		console.log("welcome 3 ")
		await cardapiosMap()
	} else {
		console.log("Opção invalida por favor tente novamente")
		await mainMenu()
	}
	await mainMenu()
}

const cardapiosMap = async () => {
	console.log("\n ## Cardapios ## \n")

	const cardapiosQuestion = await questionner.simpleQuestion(
		"Escolha a opção desejada, digite \n 1 para Criar novos cardapios, \n 2 para visualizar cardapios existentes, \n"
	)

	if (cardapiosQuestion == 1) {
		const maxCalories = await questionner.simpleQuestion(
			"Quantas Calorias deseja Comer"
		)

		const restrictsFoods = await questionner.recursiveQuestion(
			"Se houver adição de restrição alimentar por favor digite o nome do alimento",
			"N"
		)

		const meals = mealsBuilder(maxCalories, restrictsFoods)

		console.log(meals)

		console.log(`com a restrição dos alimentos ${restrictsFoods}\n`)
	} else if (cardapiosQuestion == 2) {
		console.log("opção ainda não implementada")
	} else {
		console.log("Opção invalida por favor tente novamente")
		await cardapiosMap()
	}
	await cardapiosMap()
}

const consultasMap = async () => {}

const interface = async () => {
	console.log(`Bem vindo ao iNutri DTI \n`)

	await mainMenu()

	rl.close()
}

module.exports = interface
