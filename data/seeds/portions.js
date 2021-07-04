exports.seed = knex => {
	return knex('portions').del()
		.then(() => {
			return knex('portions').insert([
				{
					id: 1,
					food_id: 1,
					portion: 'Grote appel',
					size: 160,
				},
				{
					id: 2,
					food_id: 2,
					portion: 'Plak',
					size: 35,
				},
				{
					id: 3,
					food_id: 3,
					portion: 'Volle boterham',
					size: 80,
				}
			])
		})
};
