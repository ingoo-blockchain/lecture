module.exports = (sequelize, Sequelize) => {
    class Hashtag extends Sequelize.Model {
        static initialize() {
            this.init(
                {
                    tag: {
                        type: Sequelize.STRING(15),
                        allowNull: false,
                        primaryKey: true,
                    },
                },
                {
                    sequelize,
                },
            )
        }

        static associate(models) {
            this.belongsToMany(models.Board, {
                through: 'board_hashtag',
                as: 'board',
            })
        }
    }

    Hashtag.initialize()
    return Hashtag
}
