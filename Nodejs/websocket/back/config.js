module.exports = {
    db: {
        development: {
            username: 'root',
            password: 'root',
            database: 'backend',
            host: '127.0.0.1',
            dialect: 'mysql',
            define: {
                raw: true,
                freezeTableName: true,
                timestamps: false,
            },
        },
        test: {
            username: 'root',
            password: 'root',
            database: 'backend',
            host: '127.0.0.1',
            dialect: 'mysql',
            logging: false,
        },
    },
}
