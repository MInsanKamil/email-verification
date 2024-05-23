# Setup Project
- git clone https://github.com/MInsanKamil/email-verification.git
- cd email-verification
- npm install
  
## Setup Backend
- cd backend
- npx sequelize-cli db:create
- npx sequelize-cli db:migrate

### Running Backend
- node server.js

## Setup Frontend
- cd frontend
- npm install

### Running Frontend
- npm run dev

# Screenshots
- Tampilan Awal (Halaman Register)
- Tampilan Setelah Register
- Kondisi Database (Akun sudah terdaftar, tetapi belum diverfikasi (isVerified = 0))
- Tampilan Email (berisi link yang jika ditekan, maka akun akan terverifikasi)
- Tampilan ketika link verfikasi ditekan
- Kondisi Database (Akun sudah terdaftar dan sudah terverifikasi (isVerified = 1))
  
