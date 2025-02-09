import { useState } from 'react';
import { useRouter } from 'next/router';
import LoginLayout from '@/components/LoginLayout';
import Title from '@/components/Title';
import { login } from '@/utils/api/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username dan password harus diisi');
      return;
    }

    try {
      const response = await login(username, password);

      if (response.success) {
        // Simpan token di cookie
        document.cookie = `authToken=${response.token}; path=/; max-age=3600`;
        window.location.href = "/"; // Redirect ke halaman utama
      }
    } catch (error) {
      setError(error.message || 'Login failed');
    }
  };

  return (
    <LoginLayout>
      <Title title={`Login - ${process.env.NEXT_PUBLIC_SITE_NAME}`} />
      <section className="auth-page-wrapper py-5 position-relative bg-light d-flex align-items-center justify-content-center min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              <div className="card mb-0">
                <div className="card-body">
                  <div className="row g-0 align-items-center">
                    <div className="col-xxl-12 mx-auto">
                      <div className="card mb-0 border-0 shadow-none mb-0">
                        <div className="card-body p-sm-5 m-lg-4">
                          <div className="text-center mt-5">
                            <h5 className="fs-3xl">Welcome Back</h5>
                            <p className="text-muted">Sign in to continue</p>
                          </div>
                          <div className="p-2 mt-5">
                            <form onSubmit={handleLogin}>
                              <div className="mb-3">
                                <div className="input-group">
                                  <span className="input-group-text" id="basic-addon">
                                    <i className="ri-user-3-line" />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="mb-3">
                                <div className="position-relative auth-pass-inputgroup overflow-hidden">
                                  <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1">
                                      <i className="ri-lock-2-line" />
                                    </span>
                                    <input
                                      type={passwordVisible ? 'text' : 'password'}
                                      className="form-control pe-5 password-input"
                                      placeholder="Enter password"
                                      id="password-input"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                    />
                                  </div>
                                  <button
                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                    type="button"
                                    id="password-addon"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                  >
                                    <i className={`ri-eye-fill align-middle ${passwordVisible ? 'text-primary' : ''}`} />
                                  </button>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="auth-remember-check"
                                />
                                <label className="form-check-label" htmlFor="auth-remember-check">
                                  Remember me
                                </label>
                              </div>
                              {error && (
                                <div className="alert alert-danger mt-3" role="alert">
                                  {error}
                                </div>
                              )}
                              <div className="mt-4">
                                <button className="btn btn-primary w-100" type="submit">
                                  Sign In
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LoginLayout>
  );
}