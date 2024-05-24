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
- Halaman Register
  ![Alt text](images/Screenshot(793).png)
- Tampilan Setelah Register
  ![Alt text](images/Screenshot(794).png)
- Kondisi Database (Akun sudah terdaftar, tetapi belum diverifikasi (isVerified = 0))
  ![Alt text](images/Screenshot(795).png)
- Tampilan Login
  ![Alt text](images/Screenshot(796).png)
- Tampilan Setelah Login
  ![Alt text](images/Screenshot(797).png)
- Tampilan Setelah Tombol Verifikasi Email ditekan
  ![Alt text](images/Screenshot(798).png)
- Tampilan Pesan Email Pada Akun Pengguna(berisi link yang jika ditekan, maka akun akan terverifikasi)
  ![Alt text](images/Screenshot(799).png)
- Tampilan Setelah Link Verifikasi ditekan
  ![Alt text](images/Screenshot(800).png)
- Kondisi Database (Akun sudah terdaftar dan sudah terverifikasi (isVerified = 1))
  ![Alt text](images/Screenshot(801).png)
  
