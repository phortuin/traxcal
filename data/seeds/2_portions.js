exports.seed = knex => {
	return knex('portions').del()
		.then(() => {
			return knex('portions').insert([
				{
					food_id: 1,
					portion: 'Grote appel',
					size: 160,
				},
				{
					food_id: 2,
					portion: 'Plak',
					size: 35,
				},
				{
					food_id: 3,
					portion: 'Volle boterham',
					size: 80,
				}
			])
		})
};
