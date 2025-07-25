
# dzikri-todo-app

A Todo App using Vite, Vue 3, JavaScript, Tailwind CSS (frontend) and Express (backend). Compatible with Node.js v18.18.0.

## Fitur
- Halaman Login (API: /api/login)
- Halaman Register (API: /api/register)
- Halaman Checklist (API: /api/checklist)

## Struktur Backend
- `controllers/` (authController.js)
- `routes/` (authRoutes.js)
- `middlewares/` (errorHandler.js)
- `utils/` (apiResponse.js)
- `app.js`, `server.js`

## Menjalankan Backend
```bash
cd backend
node server.js
```

## Menjalankan Frontend
```bash
npm run dev
