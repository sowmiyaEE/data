const neo4j = require('neo4j-driver');

const driver = neo4j.driver('neo4j+s://a6799275.databases.neo4j.io',
                  neo4j.auth.basic('neo4j', 'PGK9jDsxyKFmicDw4ziPHbkWANww8Q8wDQ8RY8d1Bl0'), 
                 {/* encrypted: 'ENCRYPTION_OFF' */});

const session2 = driver.session();
const tx = session2.beginTransaction();
module.exports= tx;
