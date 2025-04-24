<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "portfolio_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
  die("<h2 style='color:red;'>Koneksi gagal: " . $conn->connect_error . "</h2>");
}

// Ambil data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$message = $_POST['message'] ?? '';

// Validasi sederhana
if (empty($name) || empty($email) || empty($phone) || empty($message)) {
  echo "<h2 style='color:red;'>Semua field wajib diisi!</h2>";
  echo "<a href='index.html'>← Kembali ke formulir</a>";
  exit;
}

// Simpan data
$stmt = $conn->prepare("INSERT INTO submissions (name, email, phone, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $phone, $message);

if ($stmt->execute()) {
  echo "<h2 style='color:green;'>🎉 Pesan berhasil dikirim!</h2>";
} else {
  echo "<h2 style='color:red;'>❌ Gagal mengirim pesan: " . $stmt->error . "</h2>";
}

echo "<a href='index.html'>← Kembali ke beranda</a>";

$stmt->close();
$conn->close();
?>