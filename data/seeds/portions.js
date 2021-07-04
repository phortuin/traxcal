exports.seed = knex => {
	return knex('portions').del()
		.then(() => {
			return knex('portions').insert([
				{
					id: 1,
					portions_id_foreign: 1,
					portion: 'Grote appel',
					size: 160,
				},
				{
					id: 2,
					portions_id_foreign: 2,
					portion: 'Plak',
					size: 35,
				},
				{
					id: 3,
					portions_id_foreign: 3,
					portion: 'Volle boterham',
					size: 80,
				}
			])
		})
};
