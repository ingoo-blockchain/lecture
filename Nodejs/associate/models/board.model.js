/*
CREATE TABLE `Board` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  userId VARCHAR(30) NOT NULL, 
  register_date datetime default now(),
  hit INT default 0
);


*/

module.exports = (sequelize, Sequelize) => {
    class Board extends Sequelize.Model {
        static initialize() {
            return super.init(
                {
                    subject: {
                        type: Sequelize.STRING(100),
                        allowNull: false,
                    },
                    content: {
                        type: Sequelize.TEXT,
                        allowNull: false,
                    },
                    hit: {
                        type: Sequelize.INTEGER,
                    },
                },
                {
                    sequelize,
                },
            )
        }

        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'userId',
            })
        }
    }

    Board.initialize()
    return Board
}
