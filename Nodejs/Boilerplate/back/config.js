const config = {
    db: {
        development: {
            host: '127.0.0.1',
            port: '3306',
            username: 'ingoo',
            password: 'ingoo',
            database: 'Boilerplate',
            dialect: 'mysql',
            define: {
                raw: true,
                freezeTableName: true,
                timestamps: false,
            },
        },
        test: {
            host: '127.0.0.1',
            port: '3306',
            username: 'ingoo',
            password: 'ingoo',
            database: 'Boilerplate_test',
            dialect: 'mysql',
            logging: false,
            pool: {
                idle: 0,
                evict: 0,
            },
            define: {
                raw: true,
                freezeTableName: true,
                timestamps: false,
            },
        },
    },
}

module.exports = config
