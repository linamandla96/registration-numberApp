module.exports = function registration(pool) {
    //var regNumlist = regList || [];
    var regex = /^[a-zA-Z]{2} [0-9]{3}(-[0-9]{3})$|[a-zA-Z]{2} [0-9]{3}([0-9]{3})$|[a-zA-Z]{2} ([0-9]{3} [0-9]{3})$|[a-zA-Z]{2} ([0-9]{4})$/i;



    async function storeRegNum(regNum) {

        if (regNum) {
            if (regex.test(regNum)) {

                var regi = await pool.query('select regnumbers from regNumbers WHERE regnumbers = $1', [regNum])
                var regString = regNum.substring(0, 2);

            }

            if (regi.rowCount < 1) {
                var regT = await selectId(regString);
                await pool.query('insert into regNumbers (regnumbers,reg) values($1,$2)', [regNum, regT])


            }

        }
    }




    async function selectId(reg) {
        try{
        let regId = await pool.query('SELECT id from regTowns where regCity = $1', [reg])
        return regId.rows[0].id;
        }
        catch (err) {
            console.log("error caught this", err)
            throw err;
        }

    }

    async function registeredNum() {
        let regNumlist = await pool.query(`SELECT regnumbers from regNumbers`);
        return regNumlist.rows;
    }


    function capeReg() {
        existRegD = existReg.filter(ty => ty.startsWith(radioChecked.value));
        return existRegD;
    }


    async function resetBtn() {
        let reset = await pool.query('delete from regNumbers');
        return reset;
    }

    async function showTowns(regShow) {
        var show = await showbtn(regShow)
        let showRegTown = await pool.query(`SELECT regnumbers from regNumbers WHERE reg = $1`, [show]);
        return showRegTown.rows;


    }
    async function showbtn(regShow) {
        var regString = regShow.substring(0, 2);
        var regTownsShow = await pool.query('SELECT id from regTowns where regCity = $1', [regString])
        return regTownsShow.rows[0].id;


    }

    return {

        storeRegNum,
        registeredNum,
        capeReg,
        showTowns,
        resetBtn,
        selectId,
        showbtn,

    }
}