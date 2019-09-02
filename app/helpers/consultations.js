const clients = require("./../models/clients")
const comiteMenus = require("./../models/comiteMenus")

const getId = () => {
	let countIds = 0
	clients.clients.forEach(e => {
		if (e.consultations) {
			e.consultations.forEach(consult => {
				if (consult.id >= countIds) {
					countIds++
				}
			})
		}
	})
	return countIds
}

const deleteConsultationById = id => {
	clients.clients.forEach(client => {
		if (client.consultations) {
			client.consultations = client.consultations.filter(consult => {
				if (consult.id != id) {
					return true
				}
			})
			console.log(client.consultations)
		}
	})
}

const consultationsMap = async questionner => {
	console.log("\n ## Consultas ## \n")

	const consultationsQuestion = await questionner.simpleQuestion(
		"Escolha a opção desejada, digite \n 1 para adicionar consulta de cliente, \n 2 para visualizar todas consultas \n 3 para procurar consultas por id de usuario, \n 4 para deletar consultas existentes"
	)

	let clientId

	switch (consultationsQuestion) {
		case "1":
			clients.clients.map(client => {
				console.log({ name: client.name, id: client.id })
			})

			clientId = await questionner.simpleQuestion(
				"Digite id do cliente em que vai adicionar consulta"
			)

			let client = clients.findClientById(clientId)

			if (client) {
				console.log(JSON.stringify(client, null, 2))
			} else {
				console.log("Cliente não encontrado tente novamente")
				await consultationsMap(questionner)
			}

			let date = await questionner.simpleQuestion(
				"Digite a data da consulta"
			)
			let weight = await questionner.simpleQuestion(
				"Digite o peso do paciente"
			)
			let percentualFatMass = await questionner.simpleQuestion(
				"Digite o percentual de gordura do paciente "
			)
			let pacientFeedback = await questionner.simpleQuestion(
				"Digite o feedback do paciente "
			)
			let addExistentComiteMenu = await questionner.simpleQuestion(
				"Escolha a opção desejada, digite \n 1 para adicionar cardápio já existente,  \n 2 para criar novo cardapio "
			)

			let consulte

			if (addExistentComiteMenu == 1) {
				let allComiteMenus = comiteMenus.show()

				allComiteMenus.forEach(e =>
					console.log({ name: e.name, id: e.id })
				)

				let comiteMenuId = await questionner.simpleQuestion(
					"Digite id do cardapio em que vai adicionar consulta"
				)

				let selectedComiteMenu = comiteMenus.findComiteMenuById(
					comiteMenuId
				)
				console.log("building consultation")
				consulte = {
					date: date,
					weight: weight,
					percentualFatMass: percentualFatMass,
					pacientFeedback: pacientFeedback,
					comiteMenu: selectedComiteMenu
				}
				if (client.consultations) {
					consulte.id = getId()
					client.consultations.push(consulte)
				} else {
					consulte.id = 0
					client.consultations = [consulte]
				}

				clients.editClient(client)
				console.log(JSON.stringify(consulte, null, 2))
			} else if (addExistentComiteMenu == 2) {
				const maxCalories = await questionner.simpleQuestion(
					"Digite o numero maximo de calorias"
				)
				const restrictsFoods = await questionner.recursiveQuestion(
					"Se houver adição de restrição alimentar por favor digite o nome do alimento",
					"N"
				)
				const data = mealsBuilder(maxCalories, restrictsFoods)
				const comiteMenuName = await questionner.simpleQuestion(
					"Digite o nome desta nova dieta"
				)

				consulte = comiteMenus.addComiteMenu(comiteMenuName, data)
				comiteMenus.show()
				console.log(consulte)
				if (client.consultations) {
					consulte.id = getId()
					client.consultations.push(consulte)
				} else {
					consulte.id = 0
					client.consultations = [consulte]
				}

				clients.editClient(client)
			} else {
				console.log("opção invalida por favor tente novamente ")
				await consultationsMap()
			}

			console.log(JSON.stringify(client, null, 2))

			break
		case "2":
			console.log(JSON.stringify(clients.getConsultations(), null, 2))
			break
		case "3":
			console.log(JSON.stringify(clients.getConsultations(), null, 2))
			clients.clients.map(client => {
				console.log({ name: client.name, id: client.id })
			})
			clientId = await questionner.simpleQuestion(
				"Qual id do usuario que deseja consultar ?"
			)
			let selectedClient = clients.findClientById(clientId)

			if (selectedClient) {
				console.log(JSON.stringify(selectedClient, null, 2))
			} else {
				console.log("Cliente não encontrado tente novamente")
				await consultationsMap(questionner)
			}

			console.log(JSON.stringify(selectedClient.consultations, null, 2))

			break
		case "4":
			let consultationToDeleteId = await questionner.simpleQuestion(
				"Digite o id da consulta que deseja deletar"
			)
			await deleteConsultationById(consultationToDeleteId)

			break

		default:
			await consultationsMap(questionner)
	}
	await consultationsMap(questionner)
}

module.exports = { consultationsMap: consultationsMap }
