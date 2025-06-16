function Login({setUser, setAdmin}) {
  return (
    <div>
        <h1>Login</h1>
        <button onClick={setUser}>Usuario</button>
        <button onClick={setAdmin}>Admin</button>
    </div>
  )
}

export default Login;