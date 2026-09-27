-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 27 Sep 2026 pada 16.11
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edusmart_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT 0.0,
  `thumbnail` varchar(255) DEFAULT NULL,
  `level` enum('beginner','intermediate','advanced') DEFAULT 'beginner',
  `duration` int(11) DEFAULT 0,
  `enrolled_count` int(11) DEFAULT 0,
  `status` enum('draft','published') DEFAULT 'draft',
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `quota` int(11) NOT NULL DEFAULT 0,
  `category_id` int(11) NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `courses`
--

INSERT INTO `courses` (`course_id`, `title`, `description`, `rating`, `thumbnail`, `level`, `duration`, `enrolled_count`, `status`, `price`, `quota`, `category_id`, `instructor_id`, `created_at`) VALUES
(1, 'Fundamental Pendidikan (Behaviorisme, Kognitivisme, Konstruktivisme)', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 150000.00, 30, 1, 3, '2026-09-08 13:56:53'),
(2, 'Karakteristik Peserta Didik', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 90000.00, 40, 1, 3, '2026-09-08 13:56:53'),
(3, 'Kurikulum dan Perencanaan Pembelajaran', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 250000.00, 25, 1, 4, '2026-09-08 13:56:53'),
(4, 'Pengantar Ilmu Pemerintahan', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 120000.00, 35, 2, 3, '2026-09-08 13:56:53'),
(5, 'Sistem Pemerintahan Daerah', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 400000.00, 10, 2, 4, '2026-09-08 13:56:53'),
(6, 'Otonomi Daerah dan Desentralisasi', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 600000.00, 5, 2, 4, '2026-09-08 13:56:53'),
(7, 'Manajemen Kinerja ASN', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 220000.00, 25, 4, 3, '2026-09-08 13:56:53'),
(8, 'Rekrutmen dan Seleksi P3K', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 300000.00, 15, 4, 4, '2026-09-08 13:56:53'),
(9, 'Analisis Kebijakan Publik', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 250000.00, 20, 5, 9, '2026-09-08 13:56:53'),
(10, 'Peningkatan Kesejahteraan Sosial Masyarakat', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 180000.00, 30, 7, 3, '2026-09-08 13:56:53'),
(11, 'Pengembangan Kompetensi Aparatur', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 400000.00, 10, 8, 4, '2026-09-08 13:56:53'),
(12, 'Strategi Reformasi Birokrasi Digital', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 350000.00, 12, 9, 9, '2026-09-08 13:56:53'),
(13, 'Evaluasi dan Supervisi Pendidikan', NULL, 0.0, NULL, 'beginner', 0, 0, 'draft', 190000.00, 25, 1, 3, '2026-09-08 13:56:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `course_categories`
--

CREATE TABLE `course_categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `course_categories`
--

INSERT INTO `course_categories` (`category_id`, `category_name`) VALUES
(6, 'Digitalisasi Layanan Publik'),
(3, 'Etika Bernegara'),
(2, 'Ilmu Pemerintahan'),
(1, 'Ilmu Pendidikan'),
(5, 'Kebijakan Publik'),
(7, 'Kesejahteraan Sosial'),
(4, 'Manajemen Kepegawaian'),
(8, 'Pengembangan SDM Aparatur'),
(10, 'Perlindungan Anak dan Perempuan'),
(9, 'Reformasi Birokrasi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `enrollments`
--

CREATE TABLE `enrollments` (
  `enrollment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `enrolled_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(12,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20260911132747-create-service.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `NIK` varchar(100) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('Student','Instructor','Admin Dinas') NOT NULL DEFAULT 'Student',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `name`, `NIK`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Raza Candra Anwar', NULL, 'razacandraanwar@gmail.com', NULL, 'Student', '2026-09-08 13:56:53'),
(2, 'Siti Nurhaliza', NULL, 'siti.nurhaliza@gmail.com', NULL, 'Student', '2026-09-08 13:56:53'),
(3, 'Bambang Setiawan', NULL, 'bambangsetiawan@gmail.com', NULL, 'Instructor', '2026-09-08 13:56:53'),
(4, 'Naruto Uzumaki', NULL, 'uzumakiklan@gmail.com', NULL, 'Instructor', '2026-09-08 13:56:53'),
(5, 'Sakura Sasuke', NULL, 'iniklanku@email.com', NULL, 'Student', '2026-09-08 13:56:53'),
(6, 'Namikaze Prabowo', NULL, 'sayaakanlawan@email.com', NULL, 'Student', '2026-09-08 13:56:53'),
(7, 'Hatake Widodo', NULL, 'hidupjokowi@email.com', NULL, 'Student', '2026-09-08 13:56:53'),
(8, 'Gibran Chimaru', NULL, 'fufufafa@email.com', NULL, 'Student', '2026-09-08 13:56:53'),
(9, 'Deidada', NULL, 'megachan@email.com', NULL, 'Instructor', '2026-09-08 13:56:53'),
(10, 'Otsusuki Basweydan', NULL, 'anakabah@email.com', NULL, 'Admin Dinas', '2026-09-08 13:56:53'),
(11, 'Candra Test', NULL, 'candra1790514908296@test.com', '$2b$10$wdkwlZRxy9.57z.C91k.eedDwqNwOE4zrPahkS.vOZq6UzDS7ugym', 'Student', '2026-09-27 13:15:08'),
(12, 'Candra Test', NULL, 'candra1790516488456@test.com', '$2b$10$e0taPMBx6KFznCM08RVTeuC38U7YngZLLMKqWCn2MNAeey4JRrQve', 'Student', '2026-09-27 13:41:28');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `fk_course_category` (`category_id`),
  ADD KEY `fk_course_instructor` (`instructor_id`);

--
-- Indeks untuk tabel `course_categories`
--
ALTER TABLE `course_categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indeks untuk tabel `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `course_categories`
--
ALTER TABLE `course_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `fk_course_category` FOREIGN KEY (`category_id`) REFERENCES `course_categories` (`category_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_course_instructor` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
