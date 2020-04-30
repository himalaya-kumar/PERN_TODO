const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"user",
    port:5432,
    database:"PERN_TODO"
});

module.exports = pool;