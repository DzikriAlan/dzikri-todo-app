// authController.js
// Implementasi login dan register
exports.login = (req, res) => {
  const { username, password } = req.body;
  // Dummy logic, ganti dengan validasi user dari database
  if (username === 'admin' && password === 'admin') {
    return res.status(200).json({ message: 'Login success' });
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  // Dummy logic, ganti dengan simpan user ke database
  if (username && email && password) {
    return res.status(201).json({ message: 'Register success' });
  }
  return res.status(400).json({ message: 'Invalid data' });
};
