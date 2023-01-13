module.exports = (sequelize, Sequelize) => {
    class Board extends Sequelize.Model {
        static initialize() {
            return this.init(
                {
                    subject: {
                        type: Sequelize.STRING(100),
                        allowNull: false,
                    },
                    content: {
                        type: Sequelize.TEXT,
                        allowNull: false,
                    },
                    registerDate: {
                        type: Sequelize.DATE,
                        allowNull: false,
                        defaultValue: Sequelize.fn('now'),
                    },
                    hit: {
                        type: Sequelize.INTEGER,
                        defaultValue: 0,
                    },
                },
                {
                    sequelize,
                },
            )
        }

        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'userid',
            })

            this.belongsToMany(models.Hashtag, {
                through: 'board_hashtag',
                foreignKey: 'id',
                as: 'tag',
            })
        }
    }

    Board.initialize()
    return Board
}
