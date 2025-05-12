import React from 'react';

const Login = () => {
  return (
  <>
    <div className="container my-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <h2 className="text-center">Login</h2>
            <form method="post" action="/">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Insira o seu email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Palavra-passe</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Insira a sua password" required />
                </div>
                <a href="/" className="btn custom-btn w-100">Login</a>
                {/* <button type="submit" className="btn custom-btn w-100">Login</button> */}
                <div className="text-center mt-3">
                    <a href="/registar">Registar</a>
                </div>
            </form>
        </div>
    </div>
</div>
  </>
  );
};

export default Login;