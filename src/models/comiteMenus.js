const comiteMenus = [
	{
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
]

const addComiteMenu = (name, data) => {
	let newComiteMenu = {
		id: comiteMenus.length,
		name: name,
		data: data
	}

	return comiteMenus.push(newComiteMenu)
}

const findComiteMenuById = id => {
	let comiteMenu
	comiteMenus.forEach(e => {
		if (e.id == id) comiteMenu = e
	})
	return comiteMenu ? comiteMenu : false
}

const deleteComiteMenu = id => {
	return comiteMenus.splice(id, 1)
}

module.exports = {
	comiteMenus: comiteMenus,
	findComiteMenuById: findComiteMenuById,
	deleteComiteMenu: deleteComiteMenu,
	addComiteMenu: addComiteMenu
}
