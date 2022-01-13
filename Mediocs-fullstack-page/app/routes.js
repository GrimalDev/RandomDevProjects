module.exports = function(app, passport, fs, bcrypt, adminSecret, user_database) {
    /* --------ROUTES------------ */

    app.get('/', checkAuthenticated, async (req, res) => {
        const { name, power } =  await require('./config/index-config.js')(bcrypt, adminSecret, req, res)
        res.render('index', { name, power })
    })

    app.get('/login', checkNotAuthenticated, (req, res) => {
        res.render('login') // Render the given ejs file as response
    })

    app.post('/login', checkNotAuthenticated,
        passport.authenticate('local', { 
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }))

    app.get('/register', checkAuthenticated, checkIfAdmin, (req, res) => {
        res.render('register')
    })

    app.post('/register', checkAuthenticated, checkIfAdmin, (req, res) => {
        const { power, nom, prenom, email, password, confirmPassword } = req.body;
        require('./config/register-config.js')(user_database, bcrypt, adminSecret, power, nom, prenom, email, password, confirmPassword, req, res)
    })

    app.get('/users', (req, res) => {
        res.render('users')
    })

    app.get('/data', checkAuthenticated, (req, res) => {
        fs.readFile('./app//DATA/medical/object.json', 'utf-8', function(err, data) {
            if (err) throw err
            res.json(data)
        })
    })

    app.get('/userData', (req, res) => {
        require('./config/userData-config.js')(user_database, bcrypt, adminSecret, req, res)
    })

    app.get('/userData/modify', (req, res) => {
        require('./config/userDataModify-config.js')(req, res, user_database, bcrypt)
    })

    app.delete('/logout', checkAuthenticated, (req, res) => {
        req.logOut()
        res.redirect('/login')
    })

    /* --------------fonction to define middlewares--------------------- */

    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
        return next()
        }
    
        res.redirect('/login')
    }
    
    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/')
        }
        next()
    }

    async function checkIfAdmin(req, res, next) {
        if (await bcrypt.compare(adminSecret, req.user.power)) {
            return next()
        }
        res.redirect('/')
    }
}