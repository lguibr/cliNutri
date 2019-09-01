const clients = [
	{
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
				restrictedFood: []
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

	//ADD HANDLE TYPE OF INFOS

	return clients.push(newClient)
}

addClient("luis", "meu endereçõ loko", 682344, "oi@oi.com", "04/05/1992", [
	"banana"
])

module.exports = {
	clients: clients,
	addClient: addClient
}
