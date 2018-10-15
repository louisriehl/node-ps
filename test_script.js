const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error(`Connection error ${err}`);
  }
  // client.query("Select $1::int AS number", ['20'], (err, result) => {
  //   if (err) {
  //     return console.error(`Query error ${err}`);
  //   }
  //   console.log(result.rows[0].number);
  //   client.end();
  client.query("Select $1::int AS value, $2::varchar AS name", ['30', 'a number!'])
    .then( res => console.log(res.rows[0].name))
    .catch ( e => console.error(e.stack))
    .then ( () => client.end());
  });