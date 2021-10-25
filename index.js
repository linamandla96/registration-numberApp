let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const registration = require("./registrationNumber");

const flash = require('express-flash');
const session = require('express-session')

app.use(session({
    secret: "string save",
    resave: false,
    saveUninitialized: true
}))

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.use(express.static('public'));

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())


const pg = require("pg");
const Pool = pg.Pool;


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}


const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/registrationNumbers',
    ssl: {
        useSSL,
        rejectUnauthorized: false
    }
});



const regNumApp = registration(pool)

app.get('/', async function (req, res) {
    res.render('index', {
        display: await regNumApp.registeredNum()



    });
});
app.post('/regNum', async function (req, res) {
    var regex = /^[a-zA-Z]{2} [0-9]{3}(-[0-9]{3})$|[a-zA-Z]{2} [0-9]{3}([0-9]{3})$|[a-zA-Z]{2} ([0-9]{3} [0-9]{3})$|[a-zA-Z]{2} ([0-9]{4})$/i;

    //let theTowns = req.body.reg;
    let theRegNum = req.body.regNames;
    if (theRegNum) {
        await regNumApp.storeRegNum(req.body.regNames);
    }
     if (!theRegNum) {

        req.flash('error', 'Plase enter registration numbers')
    }
    else if (theRegNum && !regex.test(theRegNum)) {
        req.flash('error', 'Plase enter avalid registration numbers')
    }
     if (theRegNum && regex.test(theRegNum)) {
        req.flash('erro', 'Registration numbers is sucessfully added')

    }


    res.redirect('/')
});

app.post('/showtown', async function (req, res) {

    let theTowns = req.body.reg;

    if (theTowns) {
        await regNumApp.showTowns(req.body.reg);
    }
    else if (!theTowns) {
        req.flash('error', 'Plase enter  town registration numbers')
    }


    res.render('index', {
        display: await regNumApp.showTowns(req.body.reg)
    })
});

app.post('/reset', async function reset(req, res) {
    await regNumApp.resetBtn()

    res.redirect('/')
});
app.post('/showall', async function (req, res) {
    await regNumApp.showallbtn()

    res.redirect('/')
});




let PORT = process.env.PORT || 3035;

app.listen(PORT, function () {
    console.log('App started on port:', PORT);
});