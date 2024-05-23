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
  ![Alt text](images/Screenshot(779).png)
- Tampilan Setelah Register
  ![Alt text](images/Screenshot(780).png)
- Kondisi Database (Akun sudah terdaftar, tetapi belum diverfikasi (isVerified = 0))
  ![Alt text](images/Screenshot(781).png)
- Tampilan Email (berisi link yang jika ditekan, maka akun akan terverifikasi)
  ![Alt text](images/Screenshot(782).png)
- Tampilan ketika link verfikasi ditekan
  ![Alt text](images/Screenshot(783).png)
- Kondisi Database (Akun sudah terdaftar dan sudah terverifikasi (isVerified = 1))
  ![Alt text](images/Screenshot(784).png)
  
