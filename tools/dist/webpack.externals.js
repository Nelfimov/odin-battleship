"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNUSED_EXTERNALS = exports.FORCE_UNPLUGGED_PACKAGES = void 0;
exports.FORCE_UNPLUGGED_PACKAGES = new Set([
    'nan',
    'node-gyp',
    'node-pre-gyp',
    'node-addon-api',
    'fsevents',
    'core-js',
    'core-js-pure',
    'protobufjs',
]);
exports.UNUSED_EXTERNALS = [
    'cli-color',
    'flaschenpost',
    'amqp-connection-manager',
    'amqplib',
    'redis',
    'mqtt',
    'nats',
    '@nestjs/websockets',
    'typeorm-aurora-data-api-driver',
    'react-native-sqlite-storage',
    '@sap/hana-client',
    'better-sqlite3',
    'mongodb',
    'oracledb',
    'pg-native',
    'mysql',
    'ioredis',
    'hdb-pool',
    'mysql2',
    'mssql',
    'sql.js',
    'sqlite3',
    'pnpapi',
    'next',
];
