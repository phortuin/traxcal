exports.seed = knex => {
	return knex('foods').del()
		.then(() => {
			return knex('foods').insert([
				{
					food: 'Appel',
					calories: 59,
					carb: 13,
					protein: 0.3,
					fat: 0.2,
				},
				{
					food: 'Milner 30+ kaas',
					calories: 290,
					carb: 0,
					protein: 30,
					fat: 19,
				},
				{
					food: 'Hüttenkäse',
					calories: 91,
					carb: 1.6,
					protein: 12.3,
					fat: 3.9,
				}
			])
		})
};
