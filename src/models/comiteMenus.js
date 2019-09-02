let comiteMenus = [
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

const getId = () => {
	let countIds = 0
	comiteMenus.forEach(e => {
		if (e.id >= countIds) {
			countIds = e.id + 1
		}
	})
	return countIds
}

const addComiteMenu = (name, data) => {
	let newComiteMenu = {
		id: getId(),
		name: name,
		data: data
	}
	comiteMenus.push(newComiteMenu)
	return newComiteMenu
}

const findComiteMenuById = id => {
	let comiteMenu
	comiteMenus.forEach(e => {
		if (e.id == id) comiteMenu = e
	})
	return comiteMenu ? comiteMenu : false
}

const deleteComiteMenu = id => {
	comiteMenus = comiteMenus.filter(comiteMenu => {
		if (comiteMenu.id != id) {
			return true
		} else {
			console.log(
				`cardapio '${comiteMenu.name}' de id ${comiteMenu.id} foi deletado`
			)
		}
	})
	console.log(comiteMenus)
}

const show = () => {
	console.log(JSON.stringify(comiteMenus, null, 2))
	return comiteMenus
}

module.exports = {
	comiteMenus: comiteMenus,
	findComiteMenuById: findComiteMenuById,
	deleteComiteMenu: deleteComiteMenu,
	addComiteMenu: addComiteMenu,
	show: show
}
