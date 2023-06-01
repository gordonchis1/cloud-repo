const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')

  let token = ''
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decoddedToken = jwt.verify(token, process.env.JWT_SECRET_STRING)

  if (!token || !decoddedToken.id) {
    return response.status(401).json({ error: 'token missing or is invalid ' })
  }

  const { id: userId } = decoddedToken
  request.userId = userId

  next()
}
