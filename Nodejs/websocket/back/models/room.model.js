module.exports = (sequelize, Sequelize) => {
    class Room extends Sequelize.Model {
        static initialize() {
            return this.init(
                {
                    title: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    member: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        default: 10,
                    },
                    owner: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    password: {
                        type: Sequelize.STRING,
                        allowNull: true,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.fn('now'),
                    },
                },
                {
                    sequelize,
                },
            )
        }

        static associate(models) {
            this.hasMany(models.Chat, {
                foreignKey: 'id',
            })
        }
    }
    Room.initialize()
}
