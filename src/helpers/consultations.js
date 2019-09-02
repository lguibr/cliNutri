const clients = require("./../models/clients")
const constants = require("./../models/constants")
const exitString = constants.exitString
const returnMenu = constants.returnMenu

const consultationsMap = async questionner => {
	console.log("\n ## Consultas ## \n")

	const comiteMenusQuestion = await questionner.simpleQuestion(
		"Escolha a opção desejada, digite \n 1 para adicionar consulta de cliente, \n 2 para visualizar todas consultas \n 3 para procurar consultas por id de usuario, \n 4 para editar Consultas existentes, \n 5 para deletar consultas existentes"
	)

	switch (comiteMenusQuestion) {
		case "1":
			console.log("opção ainda não implementada 1 ")
			break
		case "2":
			const allClients = clients.clients
			let allConsultations = []
			allClients.forEach(client => {
				if (client.consultations) {
					allConsultations.push({
						cliente: client.name,
						consulta: client.consultations
					})
				}
			})

			console.log(JSON.stringify(allConsultations, null, 2))

			break
		case "3":
			let clientsById = clients.clients.map(client => {
				console.log({ [client.name]: client.id })
			})

			// console.log(JSON.stringify(clientsById, null, 2))

			break
		case "4":
			console.log("opção ainda não implementada 4")
			break
		case "5":
			console.log("opção ainda não implementada 5")
			break
		default:
			consultationsMap(questionner)
	}
}

module.exports = { consultationsMap: consultationsMap }

const comiteMenusMap = async questionner => {
	if (comiteMenusQuestion == 1) {
		const maxCalories = await questionner.simpleQuestion(
			"Quantas Calorias deseja Comer"
		)

		const restrictsFoods = await questionner.recursiveQuestion(
			"Se houver adição de restrição alimentar por favor digite o nome do alimento",
			"N"
		)

		const data = mealsBuilder(maxCalories, restrictsFoods)

		console.log(JSON.stringify(data, null, 2))

		console.log(
			`Cardapio com ${data.length} refeiçõees com a restrição dos alimentos ${restrictsFoods} e maxima calorias de ${maxCalories} foi gerado\n`
		)
		const name = await questionner.simpleQuestion(
			"Caso deseje salvar o cardapio, digite o nome deste cardápio"
		)
		name
			? comiteMenus.addComiteMenu(name, data)
			: console.log("Cardapio gerado mas não registrado")

		console.log(JSON.stringify(comiteMenus.comiteMenus, null, 2))
	} else if (comiteMenusQuestion == 2) {
		console.log(JSON.stringify(comiteMenus.comiteMenus, null, 2))
	} else if (comiteMenusQuestion == 3) {
		let idComiteMenu = await questionner.simpleQuestion(
			"Qual id do cardapio que deseja consultar ?"
		)
		let comiteMenu = await comiteMenus.findComiteMenuById(idComiteMenu)
		if (comiteMenu) {
			console.log(JSON.stringify(comiteMenu, null, 2))
		} else {
			console.log(
				`cardapio não encontrado tente novamente, ou digite ${returnMenu} para retornar ao menu principal ou '${exitString}' para sair \n`
			)
		}
	} else if (comiteMenusQuestion == 4) {
		let idComiteMenu = await questionner.simpleQuestion(
			"Qual id do cardapio que deseja consultar ?"
		)
		let deletedComiteMenus = await comiteMenus.deleteComiteMenu(
			idComiteMenu
		)
		if (deletedComiteMenus) {
			console.log(
				`Cardapio Deletado: ${JSON.stringify(
					deletedComiteMenus,
					null,
					2
				)}`
			)
		} else {
			console.log(
				`cliente não encontrado tente novamente, ou digite ${returnMenu} para retornar ao menu principal ou '${exitString}' para sair \n`
			)
		}
	} else {
		console.log("Opção invalida por favor tente novamente")
		await comiteMenusMap(questionner)
	}
	await comiteMenusMap(questionner)
}
