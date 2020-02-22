const db = require('../database/dbConfig')

module.exports = {
    get,
    findById,
    insert
}

function get(){
    return db('users')
}

function findById(id){
    return db('users').where({ id }).first()
}

async function insert(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
  }