//IMPORT HELPERS

const comiteMenusHelper = require("./../app/helpers/comiteMenus")

//IMPORT MODELS

const clientsModel = require("./../app/models/clients")

//TODO TESTAR:
//addClient
//findClientById
//deletedClient
//editClient
//show
//getId
//getConsultations

const comiteMenusModel = require("./../app/models/comiteMenus")

let countErrors = 0

console.log(
	"\nExecutando testes unitarios, caso haja algum erro ele sera exposto logo abaixo: \n"
)

const compareTest = () => {
	//-1 -> to foodA < foodB
	//0 -> to foodA = foodB
	//0 -> to foodA > foodB

	let foodA = { calories: 100 }
	let foodB = { calories: 200 }
	let foodC = { calories: 100 }

	let result1 = comiteMenusHelper.compareCalories(foodA, foodB)

	console.assert(
		result1 == -1,
		`Comparação incorreta, esperado -1 e recebeu ${result1}`
	)
	let result2 = comiteMenusHelper.compareCalories(foodA, foodC)
	console.assert(
		result2 == 0,
		`Comparação incorreta, esperado 0 e recebeu ${result1}`
	)
	let result3 = comiteMenusHelper.compareCalories(foodB, foodC)
	console.assert(
		result3 == 1,
		`Comparação incorreta, esperado 1 e recebeu ${result1}`
	)
}

const mealsBuilderTest = () => {
	let result1 = comiteMenusHelper.mealsBuilder(0)
	console.assert(
		result1.length == 0,
		`Comparação incorreta, esperado receber [] e recebeu ${result1}`
	)
	let result2 = comiteMenusHelper.mealsBuilder(99999, [
		"banana",
		"alface",
		"maça",
		"tomate",
		"pepino",
		"arroz",
		"feijão",
		"pão de sal",
		"torradas",
		"macarrão",
		"carne bovina",
		"lombo",
		"castanha",
		"barrinha de proteina",
		"ovo"
	])
	console.assert(
		result2.length == 0,
		`Comparação incorreta, esperado receber [] e recebeu ${JSON.stringify(
			result2
		)}`
	)

	let result3 = comiteMenusHelper.mealsBuilder(99999, [])
	console.assert(
		result3.length > 0,
		`Comparação incorreta, esperado receber [] e recebeu ${JSON.stringify(
			result3
		)}`
	)

	let result4 = comiteMenusHelper.mealsBuilder(99999, ["banana"])

	let result5

	result4.forEach(food => {
		result5 = true
		if (food.name == "banana") {
			result5 = false
		}
	})

	console.assert(
		result5,
		`Comparação incorreta, esperado receber true e recebeu ${JSON.stringify(
			result5
		)}`
	)
}

const getIdTest = () => {
	let result1 = clientsModel.getId()
	console.assert(
		result1 == 2,
		`Comparação incorreta, esperado receber 2 e recebeu ${JSON.stringify(
			result1
		)}`
	)
}

compareTest()

mealsBuilderTest()

getIdTest()

console.log("Fim dos testes unitários\n")
