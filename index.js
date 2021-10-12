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

const  regNumApp = registration()
app.get('/', function (req, res) {
    res.render('index', {
        display: regNumApp.registeredNum()

    });
});
app.post('/regNum', function (req, res) {
    regNumApp.storeRegNum(req.body.regNames);
    res.redirect('/')
});





let PORT = process.env.PORT || 3018;

app.listen(PORT, function () {
    console.log('App started on port:', PORT);
});