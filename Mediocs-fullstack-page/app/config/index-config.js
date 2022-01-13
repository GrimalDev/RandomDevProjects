module.exports = async function (bcrypt, adminSecret, req, res) {
    function capitalizeTreatment(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const tmpPower = await bcrypt.compare(adminSecret, req.user.power);

    if (tmpPower) {
        var power = "authorized";
    } else {
        var power = "non-authorized";
    }

    const name = `${capitalizeTreatment(req.user.prenom)} ${capitalizeTreatment(req.user.nom)}`;

    return {
        name,
        power
    }
}