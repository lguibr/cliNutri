//General handle menu
const rl = require("./readline")
const mealsBuilder = require("./mealsBuilder")
const clients = require("./../models/clients")
const food = require("./../models/food")

const exitString = "quit"
const returnMenu = "return"

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

const mainMenu = async () => {
	console.log("\n ## Menu Principal ## \n")

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
	} else {
		console.log("Opção invalida por favor tente novamente")
		await mainMenu()
	}
	await mainMenu()
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
		"Escolha a opção desejada, digite \n 1 para Criar novo cliente, \n 2 para visualizar clientes existentes, \n 3 para procurar clientes existentes (pelo id), \n 4 para excluir clientes existentes, \n 5 para editar clientes existentes (pelo id) "
	)
	if (clientsQuestion == 1) {
		await addClientMap()
	} else if (clientsQuestion == 2) {
		console.log(JSON.stringify(clients.clients, null, 2))
	} else if (clientsQuestion == 3) {
		let idClient = await simpleQuestion(
			"Qual id do cliente que deseja consultar ?"
		)
		let client = await clients.findClientById(idClient)
		if (client) {
			console.log(JSON.stringify(client, null, 2))
		} else {
			console.log(
				`cliente não encontrado tente novamente, ou digite ${returnMenu} para retornar ao menu principal ou '${exitString}' para sair \n`
			)
		}
	} else if (clientsQuestion == 4) {
		v
		let deletedClient = await clients.deleteClient(idClient)
		if (deletedClient) {
			console.log("Cliente : \n")
			console.log(JSON.stringify(deletedClient, null, 2))
			console.log("Deletado com sucesso! \n")
		} else {
			console.log(
				`cliente não encontrado tente novamente, ou digite ${returnMenu} para retornar ao menu principal ou '${exitString}' para sair \n`
			)
		}
	} else if (clientsQuestion == 5) {
		const id = await simpleQuestion("Qual id de usuario deseja alterar ? ")
		const name = await simpleQuestion(
			"Deseja alterar o nome do cliente ? Caso Contrario Pressione 'Enter' "
		)
		const adress = await simpleQuestion(
			"Deseja alterar o endereço do cliente ? Caso Contrario Pressione 'Enter' "
		)
		const phone = await simpleQuestion(
			"Deseja alterar o endereço do telefone ? Caso Contrario Pressione 'Enter' "
		)
		const email = await simpleQuestion(
			"Deseja alterar o endereço do email ? Caso Contrario Pressione 'Enter' "
		)
		const bornIn = await simpleQuestion(
			"Qual data de nascimento do cliente ?"
		)
		const changeRestrictsFoods = await simpleQuestion(
			"Deseja alterar as restrições alimentares ? Se sim digite 'S'  "
		)
		let newRestrictsFoods = false
		if (changeRestrictsFoods == "s") {
			newRestrictsFoods = await recursiveQuestion(
				"Se houver adição de restrição alimentar por favor digite o nome do alimento",
				"N"
			)
		}
		let editedClient = {
			id: id,
			name: name ? name : false,
			adress: adress ? adress : false,
			phone: phone ? phone : false,
			email: email ? email : false,
			bornIn: bornIn ? bornIn : false,
			newRestrictsFoods: newRestrictsFoods ? newRestrictsFoods : false
		}
		clients.editClient(editedClient)
		console.log(clients.clients)
	} else {
		console.log("Opção invalida por favor tente novamente")
		await clientsMap()
	}
	await clientsMap()
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
	} else if (cardapiosQuestion == 2) {
		console.log("opção ainda não implementada")
	} else {
		console.log("Opção invalida por favor tente novamente")
		await clientsMap()
	}
	await cardapiosMap()
}

const consultasMap = async () => {}

const interface = async () => {
	console.log(`Bem vindo ao iNutri DTI \n`)

	console.log(
		`Caso deseje encerrar o programa em qualquer momento basta digitar '${exitString}' \n`
	)
	console.log(
		`Caso deseje retornar ao menu principal em qualquer momento basta digitar '${returnMenu}' \n`
	)

	await mainMenu()

	rl.close()
}

module.exports = interface
