function Register() {
  return (
    <div>
      <h1>Create Account</h1>

      <form>
        <input
          type="text"
          placeholder="Name"
        />

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;