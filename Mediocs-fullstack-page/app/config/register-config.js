module.exports = async function (user_database, bcrypt, adminSecret, power, nom, prenom, email, password, confirmPassword, req, res) {
    const hashModule = require ('./bcrypt-config')

    if (password === confirmPassword) {

        try {

            let hashedPower
            const hashedPassword = await hashModule(bcrypt, password)
            if (power === "admin") {
                hashedPower = await hashModule(bcrypt, adminSecret)
            } else {
                hashedPower = await hashModule(bcrypt, power)
            } 

            let user = {
                nom: nom,
                prenom: prenom,
                email: email,
                power: hashedPower,
                password: hashedPassword
            }

            user_database.insert(user)
            res.redirect('/login')
        } catch {
            res.redirect('/register')
        }

    } else {
        req.flash("error", "Les champs de mot de passe ne correspondent pas!");
        return res.redirect("/register");
    }
}