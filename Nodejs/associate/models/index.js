const config = require('../config')['db']
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.database, config.username, config.password, { ...config })

require('./board.model')(sequelize, Sequelize)
require('./user.model')(sequelize, Sequelize)

for (const key in sequelize.models) {
    if (typeof sequelize.models[key]['associate'] !== 'function') continue
    sequelize.models['associate'].associate(sequelize.models)
}

;(async () => {
    await sequelize.sync({ force: true })
    const {
        models: { User, Board },
    } = sequelize

    await User.create({ userid: 'web7722', userpw: '1234', username: 'ingoo' })
    await User.create({ userid: 'admin', userpw: '1234', username: '관리자' })

    await Board.create({ subject: '1234', content: 'content', userId: 'web7722' })
    await Board.create({ subject: '123411', content: 'content', userId: 'web7722' })
    await Board.create({ subject: '232323', content: 'content', userId: 'admin' })
    await Board.create({ subject: '2323231', content: 'content', userId: 'admin' })

    const board = await Board.findAll({ include: [{ model: User }], raw: true, nest: true })
    console.log(board)

    /*
    SELECT 
        * 
    FROM Board as A
    JOIN User AS B
      ON A.userId = B.userid
    
    */
})()

module.exports = {
    sequelize,
    Sequelize,
}
