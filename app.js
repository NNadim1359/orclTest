const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const oracleDB = require('oracledb');

const router = require('./route');

const app = express();
dotEnv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

oracleDB.outFormat = oracleDB.OUT_FORMAT_OBJECT;

const OracleTest = async () => {
    let connection;

    try {
        connection = await oracleDB.getConnection({
            user: 'nadim',
            password: 'Nbl980',
            connectString: '172.31.100.12:1521/t24testdb.nblbd.com'
        });

        const result = await connection.execute(
            `SELECT FBNK_ACCOUNT.ACCOUNT_TITLE
                , FBNK_ACCOUNT.BRANCH_CODE
                , FBNK_CUSTOMER.SMS_1
            FROM FBNK_CUSTOMER INNER JOIN FBNK_ACCOUNT
            ON FBNK_ACCOUNT.CUSTOMER = FBNK_CUSTOMER.RECID WHERE FBNK_ACCOUNT.RECID = '1999003431797'
            `,
        );

        console.log(result.rows);

    } catch (error) {
        console.error(error);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error(error);
            }
        }
    }
};

OracleTest();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is now working at port: ${port}`);
    console.log(`Check app on browser at http://localhost:${port}`);
});