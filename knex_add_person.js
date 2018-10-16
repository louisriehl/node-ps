const settings = require('./settings.json');
const knex = require('knex')({
  client: 'pg',
  connection: settings
});

const query = process.argv.slice(2);
const queryObject = {
  firstName: query[0],
  lastName: query[1],
  date: query[2]
};

knex('famous_people')
  .insert(
    {first_name: queryObject.firstName,
    last_name: queryObject.lastName,
    birthdate: queryObject.date})
  .catch( err => {
    console.error(err);
  })
  .then( () => knex.destroy());