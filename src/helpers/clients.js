const clients = require("./../models/clients")
const questionner = require("./questionner")
const constants = require("./../models/constants")

const exitString = constants.exitString
const returnMenu = constants.returnMenu

const clientsMap = async () => {
	console.log("\n ## Clientes ## \n")
	const clientsQuestion = await questionner.simpleQuestion(
		"Escolha a opção desejada, digite \n 1 para Criar novo cliente, \n 2 para visualizar clientes existentes, \n 3 para procurar clientes existentes (pelo id), \n 4 para excluir clientes existentes, \n 5 para editar clientes existentes (pelo id) "
	)
	if (clientsQuestion == 1) {
		await addClientMap()
	} else if (clientsQuestion == 2) {
		console.log(JSON.stringify(clients.clients, null, 2))
	} else if (clientsQuestion == 3) {
		let idClient = await questionner.simpleQuestion(
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
		const id = await questionner.simpleQuestion(
			"Qual id de usuario deseja alterar ? "
		)
		const name = await questionner.simpleQuestion(
			"Deseja alterar o nome do cliente ? Caso Contrario Pressione 'Enter' "
		)
		const adress = await questionner.simpleQuestion(
			"Deseja alterar o endereço do cliente ? Caso Contrario Pressione 'Enter' "
		)
		const phone = await questionner.simpleQuestion(
			"Deseja alterar o endereço do telefone ? Caso Contrario Pressione 'Enter' "
		)
		const email = await questionner.simpleQuestion(
			"Deseja alterar o endereço do email ? Caso Contrario Pressione 'Enter' "
		)
		const bornIn = await questionner.simpleQuestion(
			"Qual data de nascimento do cliente ?"
		)
		const changeRestrictsFoods = await questionner.simpleQuestion(
			"Deseja alterar as restrições alimentares ? Se sim digite 'S'  "
		)
		let newRestrictsFoods = false
		if (changeRestrictsFoods == "s") {
			newRestrictsFoods = await questionner.recursiveQuestion(
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

const addClientMap = async () => {
	const name = await questionner.simpleQuestion("Qual o nome do cliente ?")
	const adress = await questionner.simpleQuestion(
		"Qual o endereço do cliente ?"
	)
	const phone = await questionner.simpleQuestion(
		"Qual o endereço do telefone ?"
	)
	const email = await questionner.simpleQuestion("Qual o endereço do email ?")
	const bornIn = await questionner.simpleQuestion(
		"Qual data de nascimento do cliente ?"
	)
	const newRestrictsFoods = await questionner.recursiveQuestion(
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

module.exports = {
	clientsMap: clientsMap
}
