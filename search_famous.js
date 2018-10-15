const pg = require('pg');
const settings = require('./settings.json');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const args = process.argv.slice(2);

client.connect( (err) => {
  if (err) {
    console.error(`Connection err: ${err}`);
  }

  console.log(`Searching...`);

  client.query(parseSelect(args[0]))
    .catch(e => console.log(err.stack))
    .then(res => console.log(parseResponse(res.rows, args[0])))
    .then(() => client.end());
});

/* -- Formats input into SQL query string -- */
function parseSelect (name) {
  return(`SELECT *
      FROM famous_people
      WHERE first_name LIKE '${name}%'
      OR last_name LIKE '%${name}'`);
}

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