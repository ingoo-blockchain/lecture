const config = {
    db: {
        username: 'root',
        password: 'root',
        database: 'associate',
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        define: {
            freezeTableName: true,
            timestamps: false,
            raw: true,
            // nest: true,
        },
    },
}

module.exports = config
