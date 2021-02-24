


const logout = () => {
  const token  = localStorage.getItem("token");
  localStorage.clear(token)
  routerBack()
}

export default logout