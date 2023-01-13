const config = {
    db: {
        development: {
            host: '127.0.0.1',
            port: '3306',
            username: 'ingoo',
            password: 'ingoo',
            database: 'nm',
            dialect: 'mysql',
            define: {
                raw: true,
                freezeTableName: true,
                timestamps: false,
            },
        },
    },
}

module.exports = config
