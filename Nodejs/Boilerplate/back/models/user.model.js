module.exports = (sequelize, Sequelize) => {
    class User extends Sequelize.Model {
        static initialize() {
            return this.init(
                {
                    userid: {
                        type: Sequelize.STRING(60),
                        allowNull: false,
                        primaryKey: true,
                    },
                    userpw: {
                        type: Sequelize.STRING(64),
                        allowNull: false,
                    },
                    nickname: {
                        type: Sequelize.STRING(15),
                        allowNull: false,
                    },
                    provider: {
                        type: Sequelize.ENUM('local', 'kakao'),
                        allowNull: false,
                        defaultValue: 'local',
                    },
                    snsId: {
                        type: Sequelize.STRING(30),
                        allowNull: true,
                    },
                },
                {
                    sequelize,
                },
            )
        }

        static associate(models) {
            this.hasMany(models.Board, {
                foreignKey: 'userid',
            })
        }
    }

    User.initialize()
    return User
}
