const clients = [
	{
		id: 0,
		name: "Maria Luzia",
		adress: "Rua Maracuja 37",
		phone: "32103210",
		email: "example@exaple.com.br",
		bornIn: "",
		appointments: [
			{
				date: "",
				schedule: "",
				weight: "",
				percentualFatMass: "",
				pacientFeedback: "",
				restrictedFood: ["arroz"]
			}
		]
	}
]

const addClient = (name, adress, phone, email, bornIn, restrictedFood = []) => {
	let newClient = {
		id: clients.length,
		name: name,
		adress: adress,
		phone: phone,
		email: email,
		bornIn: bornIn,
		restrictedFood: restrictedFood
	}

	return clients.push(newClient)
}

const findClientById = id => {
	let client
	clients.forEach(e => {
		if (e.id == id) client = e
	})
	return client ? client : false
}

const deleteClient = id => {
	return clients.splice(id, 1)
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
		appointments: oldClient.appointments
	}
	clients[editedClient.id] = newClient
	return newClient
}

addClient("luis", "meu endereçõ loko", 682344, "oi@oi.com", "04/05/1992", [
	"banana"
])

module.exports = {
	clients: clients,
	addClient: addClient,
	findClientById: findClientById,
	deleteClient: deleteClient,
	editClient: editClient
}
