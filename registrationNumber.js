module.exports = function registration(regList) {
    var regNumlist = regList || [];
    var regex = /(^[A-Z]{2}[0-9]{3}$)/ | /(^[A-Z]{3}[0-9]{3}(-)[0-9]{3}$)/ | /(^[A-Z]{2}[0-9]{6}$)/;



    function storeRegNum(regNum) {
        
        if (regNum) {
            if (!regNumlist.includes(regNum)) {
                regNumlist.push(regNum);

            }

        }
    }

    function registeredNum() {
        return regNumlist;
    }


    function capeReg() {
        existRegD = existReg.filter(ty => ty.startsWith(radioChecked.value));
     return existRegD;
    }

    

    return {

        storeRegNum,
        registeredNum,
        capeReg,
        

    }
}