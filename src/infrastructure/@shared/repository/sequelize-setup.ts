import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const sequelizeOptions: SequelizeOptions = {
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
};

export function setupSequelize(options: SequelizeOptions = {}) {

    let _sequelize: Sequelize;

    beforeEach(async () => {
        _sequelize = new Sequelize({
            ...sequelizeOptions,
            ...options,
        })

        await _sequelize.sync();
    });

    afterEach(async () => {
        await _sequelize.close()
    });

    return {
        get sequelize() {
            return _sequelize;
        },
    };
};