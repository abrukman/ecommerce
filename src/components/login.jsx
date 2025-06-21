function Login({setUser, setAdmin, user, admin}) {
  return (
    <div>
        <h1>Login</h1>
        <button onClick={setUser} style={user ? {backgroundColor: 'green'} : {backgroundColor: 'red'}}>Usuario</button>
        <button onClick={setAdmin} style={admin ? {backgroundColor: 'green'} : {backgroundColor: 'red'}}>Admin</button>
    </div>
  )
}

export default Login;