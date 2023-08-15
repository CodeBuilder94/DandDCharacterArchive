const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');

const syncTables = async()=> {
  const SQL = `
  DROP TABLE IF EXISTS languages;
  DROP TABLE IF EXISTS stats;
  DROP TABLE IF EXISTS characters;
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
  );

  CREATE TABLE characters(
  id SERIAL PRIMARY KEY,
  "userId" INTEGER REFERENCES users(id)
  "characterName" VARCHAR(100)
  );

  CREATE TABLE languages(
    id SERIAL PRIMARY KEY,
    "characterId" INTEGER REFERENCES characters(id)
    language VARCHAR(100)
  );

  CREATE TABLE stats(
    id SERIAL PRIMARY KEY,
    "characterId" INTEGER REFERENCES characters(id),
    hp INTEGER NOT NULL,
    "tempHP" INTEGER NOT NULL,
    str INTEGER NOT NULL,
    dex INTEGER NOT NULL,
    con INTEGER NOT NULL,
    int INTEGER NOT NULL,
    wis INTEGER NOT NULL,
    char INTEGER NOT NULL,
    ac INTEGER NOT NULL,
    speed INTEGER NOT NULL
  );

  `;
  await client.query(SQL);
};

const syncAndSeed = async()=> {
  await syncTables();
  const [moe, lucy]  = await Promise.all([
    createUser({
      username: 'moe',
      password: 'moe_password'
    }),
    createUser({
      username: 'lucy',
      password: 'lucy_password'
    })
  ]);
  console.log('--- seeded users ---');
  console.log(moe);
  console.log(lucy);
};


module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client
};
