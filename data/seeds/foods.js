exports.seed = knex => {
	return knex('foods').del()
		.then(() => {
			return knex('foods').insert([
				{
					id: 1,
					food: 'Appel',
					calories: 59,
					carb: 13,
					protein: 0.3,
					fat: 0.2,
				},
				{
					id: 2,
					food: 'Milner 30+',
					calories: 290,
					carb: 0,
					protein: 30,
					fat: 19,
				},
				{
					id: 3,
					food: 'Hüttenkäse',
					calories: 91,
					carb: 1.6,
					protein: 12.3,
					fat: 3.9,
				}
			])
		})
};
