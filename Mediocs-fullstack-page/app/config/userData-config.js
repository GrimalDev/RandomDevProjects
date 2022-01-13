module.exports = async function(user_database, bcrypt, adminSecret, req, res) {
    user_database.find({}, async function (err, allUsers) {
        if (err) throw err

        for (var user in allUsers) {

            for (var key in allUsers[user]) {

                if (key === "power") {
                    const tmpPower = await bcrypt.compare(adminSecret, allUsers[user].power)
                    if (tmpPower) {
                        var tmpElement = "Administrateur"
                    } else {
                        var tmpElement = "Normal"
                    }
                    allUsers[user].power = tmpElement
                }
            }

        }
        res.json(allUsers)
        return
    });
}