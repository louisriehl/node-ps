const settings = require('./settings.json');
const knex = require('knex')({
  client: 'pg',
  connection: settings
});

const query = process.argv.slice(2)[0];

knex.select('*')
  .from('famous_people')
  .where('first_name', query)
  .orWhere('last_name', query)
  .then(rows => {
    console.log(parseResponse(rows));
  })
  .catch(error => {
    console.error(error);
  })
  .then( () => knex.destroy);

/* -- Takes query object, parses it into a string, and returns it -- */
function parseResponse (personArray, query) {
  const length = personArray.length;
  let parsedResponse = `Found ${length} person(s) by the name of ${query}\n`;

  /* -- For every element in the personArray, extract the desired data and add it to the response string -- */
  for(let person = 0; person < length; person++) {
    const name = `${personArray[person].first_name} ${personArray[person].last_name}`;
    const birthday = personArray[person].birthdate.toString().slice(0,15);
    parsedResponse += `-${person + 1}: ${name}, born ${birthday}\n`;
  }
  return parsedResponse;
}