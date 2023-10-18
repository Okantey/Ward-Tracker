
const notFound = (request, response, next) => {
  const error = new Error(`Not found - ${request.originalUrl}`)
  response.status(404)
  next(error)
}


export { notFound }