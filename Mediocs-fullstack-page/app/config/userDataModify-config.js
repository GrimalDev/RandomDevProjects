module.exports = async function modifyUserData(req, res, user_database, bcrypt) {
    const { power, nom, prenom, email, password, confirmPassword } = req.body;

    

    user_database.update()

}