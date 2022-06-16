const neo4j = require('neo4j-driver');

const driver = neo4j.driver('neo4j+s://befd9f22.databases.neo4j.io',
                  neo4j.auth.basic('neo4j', 'Qv49S3R06e76dMEeHKQAH7v0X36s03TbZ8SPp0KvYos'), 
                 {/* encrypted: 'ENCRYPTION_OFF' */});

const session2 = driver.session();
let tx = session2.beginTransaction();
module.exports= tx;
