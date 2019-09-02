let clients = [
	{
		id: 1,
		name: "Maria Luzia 1",
		adress: "Rua Maracuja 37",
		phone: "32103210",
		email: "example@exaple.com.br",
		bornIn: "",
		consultations: [
			{
				id: "0",
				date: "27/02/12",
				weight: "230",
				percentualFatMass: "90%",
				pacientFeedback:
					"Estou me sentindo infeliz com meu peso, gostaria de emagrecer",
				comiteMenu: {
					id: 0,
					name: "120 calorias sem banana",
					data: [
						{
							legume: {
								name: "alface",
								calories: 10
							},
							carboidrato: {
								name: "torradas",
								calories: 50
							},
							proteina: {
								name: "barrinha de proteina",
								calories: 40.22
							},
							calories: 100.22,
							restCalories: 19.78,
							restrictedFoods: ["banana"]
						},
						{
							legume: {
								name: "alface",
								calories: 10
							},
							carboidrato: {
								name: "torradas",
								calories: 50
							},
							proteina: {
								name: "ovo",
								calories: 55
							},
							calories: 115,
							restCalories: 5,
							restrictedFoods: ["banana"]
						}
					]
				}
			}
		]
	},
	{
		id: 0,
		name: "Luzia doidera 0",
		adress: "Rua laranja 7",
		phone: "22133210",
		email: "opa@exaple.com.br",
		bornIn: "1992",
		consultations: [
			{
				id: 1,
				date: "17/12/17",
				weight: "40",
				percentualFatMass: "10%",
				pacientFeedback:
					"Estou me sentindo infeliz com meu peso, gostaria de engordar bastante",
				comiteMenu: {
					id: 1,
					name: "novo",
					data: [
						{
							legume: {
								name: "alface",
								calories: 10
							},
							carboidrato: {
								name: "torradas",
								calories: 50
							},
							proteina: {
								name: "barrinha de proteina",
								calories: 40.22
							},
							calories: 100.22,
							restCalories: 39.78,
							restrictedFoods: []
						},
						{
							legume: {
								name: "alface",
								calories: 10
							},
							carboidrato: {
								name: "torradas",
								calories: 50
							},
							proteina: {
								name: "ovo",
								calories: 55
							},
							calories: 115,
							restCalories: 25,
							restrictedFoods: []
						},
						{
							legume: {
								name: "alface",
								calories: 10
							},
							carboidrato: {
								name: "torradas",
								calories: 50
							},
							proteina: {
								name: "carne bovina",
								calories: "74"
							},
							calories: 134,
							restCalories: 6,
							restrictedFoods: []
						},
						{
							legume: {
								name: "pepino",
								calories: 40
							},
							carboidrato: {
								name: "torradas",
								calories: 50
							},
							proteina: {
								name: "barrinha de proteina",
								calories: 40.22
							},
							calories: 130.22,
							restCalories: 9.780000000000001,
							restrictedFoods: []
						}
					]
				}
			}
		]
	}
]

const getId = array => {
	let countIds = 0
	array.forEach(e => {
		if (e.id >= countIds) {
			countIds = e.id + 1
		}
	})
	return countIds
}

const addClient = (name, adress, phone, email, bornIn, restrictedFood = []) => {
	let newClient = {
		id: getId(clients),
		name: name,
		adress: adress,
		phone: phone,
		email: email,
		bornIn: bornIn,
		restrictedFood: restrictedFood
	}
	clients.push(newClient)
	return newClient
}

const findClientById = id => {
	let client
	clients.forEach(e => {
		if (e.id == id) client = e
	})
	return client ? client : false
}

const deleteClient = id => {
	clients = clients.filter(client => {
		if (client.id != id) {
			return true
		} else {
			console.log(`${client.name} de id ${client.id} foi deletado`)
		}
	})
}

const show = () => {
	console.log(JSON.stringify(clients, null, 2))
	return clients
}

const getConsultations = () => {
	let allConsultations = []
	clients.forEach(client => {
		if (client.consultations) {
			allConsultations.push({
				cliente: client.name,
				consulta: client.consultations
			})
		}
	})
	return allConsultations
}

const editClient = editedClient => {
	let oldClient = findClientById(editedClient.id)
	let newClient = {
		id: editedClient.id,
		name: editedClient.name ? editedClient.name : oldClient.name,
		adress: editedClient.adress ? editedClient.adress : oldClient.adress,
		phone: editedClient.phone ? editedClient.phone : oldClient.phone,
		email: editedClient.email ? editedClient.email : oldClient.email,
		bornIn: editedClient.bornIn ? editedClient.bornIn : oldClient.bornIn,
		newRestrictsFoods: editedClient.newRestrictsFoods
			? editedClient.newRestrictsFoods
			: oldClient.newRestrictsFoods,
		consultations: oldClient.consultations
	}

	oldClient = newClient
	return newClient
}

module.exports = {
	clients: clients,
	addClient: addClient,
	findClientById: findClientById,
	deleteClient: deleteClient,
	editClient: editClient,
	show: show,
	getConsultations: getConsultations
}
