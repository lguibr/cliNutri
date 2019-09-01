//General handle menu
const rl = require("./readline")
const mealsBuilder = require("./mealsBuilder")
const clients = require("./../models/clients")
const food = require("./../models/food")

const exitString = "quit"

const simpleQuestion = stringQuestion => {
	return new Promise((resolve, reject) => {
		rl.question(`${stringQuestion}\n`, answer => {
			if (answer == exitString) {
				rl.close()
			}
			resolve(answer)
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

const welcomeMap = async () => {
	const welcomeQuestion = await simpleQuestion(
		"Escolha a opção desejada, digite \n 1 para Clientes, \n 2 para Consultas, \n 3 para cardapios"
	)

	if (welcomeQuestion == 1) {
		console.log("welcome 1")
		await clientsMap()
	} else if (welcomeQuestion == 2) {
		console.log("welcome 2")
		console.log("\n ## Consultas ## \n")
	} else if (welcomeQuestion == 3) {
		console.log("welcome 3 ")
		await cardapiosMap()
	}
}
const addClientMap = async () => {
	const name = await simpleQuestion("Qual o nome do cliente ?")
	const adress = await simpleQuestion("Qual o endereço do cliente ?")
	const phone = await simpleQuestion("Qual o endereço do telefone ?")
	const email = await simpleQuestion("Qual o endereço do email ?")
	const bornIn = await simpleQuestion("Qual data de nascimento do cliente ?")
	const newRestrictsFoods = await recursiveQuestion(
		"Se houver adição de restrição alimentar por favor digite o nome do alimento",
		"N"
	)
	console.log(newRestrictsFoods)
	await clients.addClient(
		name,
		adress,
		phone,
		email,
		bornIn,
		newRestrictsFoods
	)
	console.log(clients.clients)
	return clients.clients
}

const clientsMap = async () => {
	console.log("\n ## Clientes ## \n")
	const clientsQuestion = await simpleQuestion(
		"Escolha a opção desejada, digite \n 1 para Criar novo cliente, \n 2 para visualizar clientes existentes, \n 3 para editar clientes existentes, \n 4 para excluir clientes existentes \n "
	)
	if (clientsQuestion == 1) {
		await addClientMap()
	} else if (clientsQuestion == 2) {
		console.log(clients.clients)
	} else if (clientsQuestion == 3) {
		console.log("editar cliente ainda não implementado")
	}
}

const cardapiosMap = async () => {
	console.log("\n ## Cardapios ## \n")

	const cardapiosQuestion = await simpleQuestion(
		"Escolha a opção desejada, digite \n 1 para Criar novos cardapios, \n 2 para visualizar cardapios existentes, \n"
	)

	if (cardapiosQuestion == 1) {
		const maxCalories = await simpleQuestion(
			"Quantas Calorias deseja Comer"
		)

		const restrictsFoods = await recursiveQuestion(
			"Se houver adição de restrição alimentar por favor digite o nome do alimento",
			"N"
		)

		const meals = mealsBuilder(maxCalories, restrictsFoods)

		console.log(meals)

		console.log(`com a restrição dos alimentos ${restrictsFoods}\n`)
	}
}

const consultasMap = async () => {}

const interface = async () => {
	console.log(`Bem vindo ao iNutri DTI \n`)

	console.log(
		`Caso deseje encerrar o programa em qualquer momento basta digitar a palavra '${exitString}' \n`
	)

	await welcomeMap()

	rl.close()
}

module.exports = interface
