const fs = require('fs')
const path = require('path')

const env = process.env.NODE_ENV || 'development'
const config = require('../config')['db'][env]
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.database, config.username, config.password, config)

fs.readdirSync(__dirname)
    .filter((v) => v.indexOf('model') !== -1)
    .forEach((file) => {
        require(path.join(__dirname, file))(sequelize, Sequelize)
    })

const { models } = sequelize
for (const key in models) {
    if (typeof models[key].associate !== 'function') continue
    models[key].associate(models)
}

// ;(async () => {
//     await sequelize.sync({ force: true })

//     const { User, Board, Hashtag, board_hashtag } = models

//     await User.create({ userid: 'web7722', userpw: '1234', nickname: 'ingoo' })
//     await User.create({ userid: 'admin', userpw: '1234', nickname: '관리자' })

//     await Board.create({ subject: '게시글1', content: '내요옹', userid: 'web7722' })
//     await Board.create({ subject: '게시글2', content: '내요옹', userid: 'web7722' })
//     await Board.create({ subject: '게시글3', content: '내요옹', userid: 'web7722' })
//     await Board.create({ subject: '게시글4', content: '내요옹', userid: 'web7722' })
//     await Board.create({ subject: '게시글5', content: '내요옹', userid: 'admin' })
//     const post = await Board.create({ subject: '게시글6', content: '내요옹', userid: 'admin' })

//     const hashtags = ['#Javascript', '#Nodejs', '#hello']
//     const all = hashtags.map((tag) => {
//         return Hashtag.findOrCreate({
//             raw: true,
//             nest: true,
//             where: { tag },
//         })
//     })
//     const result = await Promise.all(all) //Hashtag Table 찾고 넣기
//     // await Board.addHashTag(result.map((r) => r[0]))
//     for (const hash of result) {
//         console.log(hash[0].dataValues)
//         await post.addTag(hash[0].dataValues.tag)
//     }

//     // console.dir(post.__proto__)

//     // console.dir(Board)
//     /*
//         VARCHAR 타입을 FOREIGN KEY 설정시.
//         Charset 과 Collation 내용이 다르면, 타입이 다르다고, 설정이안되는 오류.
//     */

//     /*

//         SELECT * FROM information_schema.table_constraints
//         WHERE TABLE_SCHEMA = 'nm' AND TABLE_NAME = 'Board';
//     */

//     /*
//      */

//     const boards = await Board.findAll({
//         raw: true,
//         nest: true,
//         include: {
//             model: User,
//             attributes: ['nickname'],
//         },
//     })

//     console.log(boards)

//     // hashtag 검색
//     const serachTag = '#Javascript'
//     const hashTag = await Hashtag.findOne({ where: { tag: serachTag } })

//     // console.log(hashTag.__proto__)
//     // const a = await hashTag.get({ include: [{ model: Board }] })
//     // console.log(a.__proto__)

//     // console.log(models)

//     const list = await hashTag.getBoard({
//         raw: true,
//         nest: true,
//         include: [{ model: User }],
//     })
//     console.log(list)
// })()

module.exports = {
    sequelize,
    Sequelize,
}
