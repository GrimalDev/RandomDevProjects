module.exports = async function hashPassword(bcrypt, toHash) {
    const hashedString = await bcrypt.hash(toHash, 10)
    return hashedString
}