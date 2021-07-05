exports.seed = knex => {
	return knex('diary').del()
		.then(() => {
			return knex('diary').insert([
				{
					portion_id: 1,
					date: knex.raw('CURRENT_TIMESTAMP'),
				},
				{
					portion_id: 2,
					date: knex.raw('CURRENT_TIMESTAMP'),
				},
				{
					portion_id: 3,
					date: knex.raw('CURRENT_TIMESTAMP'),
				}
			])
		})
};
