// @desc auth user / set token
//route POST api/users/auth
// @access PUBLIC

const authUser = (request, response) => {
  response.status(200).json({ message: "User is authenticated" })
}

export { authUser }