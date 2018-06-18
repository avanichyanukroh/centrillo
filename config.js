'use strict';
exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    'mongodb://localhost/usersDB';
    //'mongodb://anawin:anawin123@ds157639.mlab.com:57639/anawin-mlab-db';
exports.TEST_DATABASE_URL = 
	process.env.TEST_DATABASE_URL || 
	'mongodb://anawin:anawin123@ds249530.mlab.com:49530/anawin-mlab-db-test';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || "secret";
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';