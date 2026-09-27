# EduSmart LMS API – Authentication & Testing API

REST API berbasis **Node.js, Express, dan MySQL** yang dilengkapi autentikasi **JWT** (register, login, proteksi route) dan CRUD Product. Project ini adalah lanjutan dari Mini Project EduSmart LMS (FWD Batch 12 – Dibimbing).

## Tech Stack
- Node.js + Express
- MySQL (mysql2/promise)
- dotenv
- jsonwebtoken (JWT)
- bcryptjs (hash password)
- Postman (testing) & OpenAPI/Swagger (dokumentasi)

## Struktur Folder
```
├── database/          # file SQL untuk import database
├── docs/openapi.yaml  # dokumentasi API (OpenAPI 3)
├── postman/           # Postman Collection & Environment
├── src/
│   ├── config/        # koneksi database
│   ├── controllers/   # logic request & response
│   ├── middlewares/   # authenticate (verifikasi JWT)
│   ├── repositories/  # query ke database
│   ├── routes/        # definisi endpoint
│   └── app.js
├── .env.example
└── server.js
```

## 1. Instalasi
```bash
git clone <url-repository>
cd edusmart-lms-api
npm install
```

## 2. Konfigurasi Environment
Salin `.env.example` menjadi `.env`, lalu isi sesuai MySQL di komputer masing-masing:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=edusmart_db
JWT_SECRET=isi_dengan_string_rahasia_yang_panjang
JWT_EXPIRES_IN=1d
```
> File `.env` tidak disertakan di repository / ZIP karena berisi credential.

## 3. Import Database
1. Buat database baru bernama `edusmart_db` (phpMyAdmin / MySQL Workbench).
2. Import file `database/edusmart_db.sql`.

## 4. Menjalankan Server
```bash
npm run dev   # mode development (nodemon)
npm start     # mode biasa
```
Server berjalan di `http://localhost:3000`.

## 5. Daftar Endpoint
Base URL: `http://localhost:3000/api`

| Method | Endpoint | Auth | Keterangan |
|---|---|---|---|
| POST | /auth/register | - | Registrasi user (password di-hash bcrypt) |
| POST | /auth/login | - | Login, mengembalikan JWT |
| GET | /products | - | Ambil semua produk |
| GET | /products/:id | - | Ambil detail produk |
| POST | /products | Bearer Token | Tambah produk |
| PATCH | /products/:id | Bearer Token | Ubah sebagian data produk |
| DELETE | /products/:id | Bearer Token | Hapus produk |

Header untuk endpoint yang dilindungi:
```
Authorization: Bearer <token>
```

## 6. Testing dengan Postman
1. Buka Postman → **Import** → pilih kedua file di folder `postman/`:
   - `Product API.postman_collection.json`
   - file environment `Product API Local`
2. Pilih environment **Product API Local** di pojok kanan atas.
3. Pastikan server sudah berjalan.
4. Klik **⋯** pada collection **Product API** → **Run** → **Start run**.

Test script otomatis:
- **Register** membuat email acak di setiap run agar tidak bentrok (409).
- **Login** menyimpan token ke variabel `token` secara otomatis.
- **Create Product** menyimpan `product_id` secara otomatis.
- Setiap request memiliki assertion status code.

Skenario yang diuji bisa menggunakan hal ini:

| No | Folder | Request | Expected |
|---|---|---|---|
| 1 | Auth | POST /auth/register | 201 |
| 2 | Auth | POST /auth/login | 200 |
| 3 | Auth | POST /auth/login (password salah) | 401 |
| 4 | Products | GET /products | 200 |
| 5 | Products | POST /products tanpa token | 401 |
| 6 | Products | POST /products dengan token | 201 |
| 7 | Products | PATCH /products/:id | 200 |
| 8 | Products | DELETE /products/:id | 200 |
| 9 | Products | GET /products/:id (sudah dihapus) | 404 |
| 10 | Products | POST /products body tidak valid | 400 |

Hasil Collection Runner: **10 passed, 0 failed**.

## 7. Dokumentasi API
Dokumentasi lengkap ada di `docs/openapi.yaml`. Untuk melihatnya, saya mencoba dengan https://editor.swagger.io lalu paste isi file tersebut.

Draft dokumentasi dibuat dengan bantuan AI, kemudian divalidasi manual dengan mencocokkan status code dan response message terhadap hasil Collection Runner.

## Author
Raza Candra Anwar – FWD Batch 12, Dibimbing.id