// CREATE TABLE `User` (
//     userid VARCHAR(30) PRIMARY KEY,
//     userpw VARCHAR(64),
//     username VARCHAR(20)
//   );

module.exports = (sequelize, Sequelize) => {
    class User extends Sequelize.Model {
        static initialize() {
            return this.init(
                {
                    userid: {
                        type: Sequelize.STRING(30),
                        primaryKey: true,
                    },
                    userpw: {
                        type: Sequelize.STRING(64),
                        allowNull: false,
                    },
                    username: {
                        type: Sequelize.STRING(20),
                        allowNull: false,
                    },
                },
                {
                    sequelize,
                },
            )
        }

        static associate(models) {
            this.hasMany(models.Board, {
                foreignKey: 'userId',
            })
        }
    }

    User.initialize()
    User.removeAttribute('id')
    return User
}
