const db = require('../database/dbConfig')

module.exports = {
    get,
    findById,
    filtering,
    insert
}

function get(){
    return db('users')
}

function findById(id){
    return db('users').where({ id }).first()
}

function filtering(login) {
    return db('users').where(login).first()
}


async function insert(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
  }