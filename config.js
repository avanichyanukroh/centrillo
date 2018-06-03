'use strict';
exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://anawin:anawin123@ds157639.mlab.com:57639/anawin-mlab-db';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || "secret";
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';