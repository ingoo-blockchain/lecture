module.exports = (sequelize, Sequelize) => {
    class Chat extends Sequelize.Model {
        static initialize() {
            return this.init(
                {
                    user: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    chat: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    gif: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        defaultValue: sequelize.fn('now'),
                    },
                },
                {
                    sequelize,
                },
            )
        }

        static associate(models) {
            this.belongsTo(models.Room, {
                foreignkey: 'roomid',
            })
        }
    }
    Chat.initialize()
}
