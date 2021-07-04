exports.seed = knex => {
  return knex('food').del()
    .then(() => {
      return knex('food').insert([
        {id: 1, food: 'apple'},
        {id: 2, food: 'cheese'},
        {id: 3, food: 'hüttenkäse'}
      ])
    })
};
