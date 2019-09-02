//IMPORT HELPERS

const comiteMenusHelper = require("./../src/helpers/comiteMenus")

//IMPORT MODELS

const clientsModel = require("./../src/models/clients")
console.log(clientsModel)
const comiteMenusModel = require("./../src/models/comiteMenus")

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
		`Comparação incorreta, esperado 0 e recebeu ${result1}`
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
}

compareTest()

mealsBuilderTest()

console.log("Fim dos testes unitários\n")
