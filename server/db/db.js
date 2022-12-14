const conn = require('./connection')

async function getUserDeck(userId, db = conn) {
  return await db('myDeck')
    //.join('user', 'teams.user_id', 'user.id')
    .where('user_id', userId)
    .select()
}

async function insertUsersDeck(userId, cardData, db = conn) {
  // const data = { user_id: userId, card_id: cardId }
  console.log(cardData)
  return await db('myDeck').where('user_id', userId).insert(cardData)
}

async function removeUsersCard(id, db = conn) {
  return await db('myDeck').where('id', id).del()
}

async function removeUserDeck(id, db = conn) {
  return await db('myDeck').where('user_id', id).del()
}

module.exports = {
  insertUsersDeck,
  getUserDeck,
  removeUsersCard,
  removeUserDeck,
}
