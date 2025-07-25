// src/router/auth.js
export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export function requireAuth(to, from, next) {
  if (!isAuthenticated()) {
    next({ name: 'Login' });
  } else {
    next();
  }
}
