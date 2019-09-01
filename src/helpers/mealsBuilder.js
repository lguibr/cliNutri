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

module.exports = (maxCalories, restrictedFoods = []) => {
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
							meals.push([
								legume,
								carboidrato,
								proteina,
								{
									calories:
										+legume.calories +
										+proteina.calories +
										+carboidrato.calories
								},
								{
									restCalories:
										avaiableCalories - proteina.calories
								}
							])
						}
					})
				}
			})
		}
	})

	return meals
}
