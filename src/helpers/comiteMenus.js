const comiteMenus = require("./../models/comiteMenus")
const constants = require("./../models/constants")

const exitString = constants.exitString
const returnMenu = constants.returnMenu

const food = require("../models/food")

const compareCalories = (a, b) => {
	if (+a.calories > +b.calories) {
		return 1
	}
	if (+b.calories > +a.calories) {
		return -1
	}
	return 0
}

mealsBuilder = (maxCalories, restrictedFoods = []) => {
	let countInterations = 0
	let [legumes, carboidratos, proteinas] = food.map(e =>
		e.sort(compareCalories)
	)

	const meals = []

	legumes.forEach((legume, indexLegume) => {
		avaiableCalories = maxCalories
		const meal = []
		countInterations++
		if (
			legume.calories < avaiableCalories &&
			!restrictedFoods.includes(legume.name)
		) {
			avaiableCalories -= legume.calories
			meal.push(legume)
			carboidratos.forEach((carboidrato, indexCarboidrato) => {
				countInterations++
				if (
					carboidrato.calories < avaiableCalories &&
					carboidrato.name != legume.name &&
					!restrictedFoods.includes(carboidrato.names)
				) {
					avaiableCalories -= carboidrato.calories
					meal.push(carboidrato)
					proteinas.forEach((proteina, indexProteina) => {
						countInterations++
						if (
							proteina.calories < avaiableCalories &&
							carboidrato.name != proteina.name &&
							legume.name != proteina.name &&
							!restrictedFoods.includes(proteina.name)
						) {
							meals.push({
								legume,
								carboidrato,
								proteina,

								calories:
									parseFloat(legume.calories) +
									parseFloat(proteina.calories) +
									parseFloat(carboidrato.calories),

								restCalories:
									parseFloat(avaiableCalories) -
									parseFloat(proteina.calories)
							})
						}
					})
				}
			})
		}
	})

	return meals
}

const comiteMenusMap = async questionner => {
	console.log("\n ## Cardapios ## \n")

	const comiteMenusQuestion = await questionner.simpleQuestion(
		"Escolha a opção desejada, digite \n 1 para Criar novo Cardapio, \n 2 para visualizar Cardapios existentes, \n 3 para procurar Cardapios existentes (pelo id), \n 4 para excluir Cardapios existentes"
	)

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
		console.log("Opção não implementada ainda")
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
	} else {
		console.log("Opção invalida por favor tente novamente")
		await comiteMenusMap(questionner)
	}
	await comiteMenusMap(questionner)
}

module.exports = {
	comiteMenusMap: comiteMenusMap
}
