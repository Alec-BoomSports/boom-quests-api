module.exports.authenticateUser = function (req, res, next) {
  const user = req.headers.authorization
  if (!user) {
    return res.sendStatus(401)
  }

  req.user = user
  next()
}
