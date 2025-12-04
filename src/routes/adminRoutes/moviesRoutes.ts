import express from 'express'
import { createMovie, getMovies } from '../../controllers/movieController'
import multer from 'multer'
import { imageFilter, thumbnailStorage } from '../../utils/multer'

const upload = multer({storage: thumbnailStorage(), fileFilter: imageFilter})
const movieRoutes = express.Router()

movieRoutes.get('/movies', getMovies)
movieRoutes.post('/movies', upload.single('thumbnail'), createMovie)

export default movieRoutes


// langkah-langkah membuat api
// 1. buat midelnya
// 2. buat controller untuk menghandel logicnya 
// 3. buat route untuk menghubungkan antara endpoint dengan controller 
// 4. daftarkan routes di index.js 
// 5. test menggunakan postman atau sejenisnya

// langka-langkah membuat proyek express js
// 1. inisialisasi proyek menggunakan npm init -y
// 2. install express js menggunakan npm install express
// 3. buat file index.js sebagai entry point aplikasi
// 4. jalankan aplikasi menggunakan node index.js
// 5. tambahkan nodemon untuk memudahkan pengembangan menggunakan npm install --save-dev nodemon
// 6. tambahkan script start dan dev di package.json
// 7. jalankan aplikasi menggunakan npm run dev

// langkah-langkah membuat model mongoose
// 1. buat folder models
// 2. buat file model.js di dalam folder models
// 3. import mongoose
// 4. buat skema menggunakan mongoose.Schema
// 5. buat model menggunakan mongoose.model
// 6. export model tersebut


// langkah-langkah membuat koneksi database mongoose
// 1. install mongoose menggunakan npm install mongoose
// 2. import mongoose di file index.js
// 3. buat koneksi ke database menggunakan mongoose.connect
// 4. tangani event koneksi sukses dan error
// 5. jalankan aplikasi dan pastikan koneksi berhasil

// langkah-langkan menggunakan zod untuk validasi data
// 1. install zod menggunakan npm install zod
// 2. import zod di file yang akan digunakan untuk validasi
// 3. buat skema validasi menggunakan zod.object
// 4. gunakan skema validasi untuk memvalidasi data yang masuk
// 5. tangani error validasi jika data tidak sesuai

// langkah-langkah membuat virtual di mongoose
// 1. buat skema mongoose
// 2. tambahkan opsi virtuals di skema
// 3. buat virtual menggunakan skema.virtual
// 4. tambahkan getter atau setter di virtual
// 5. pastikan opsi toJSON atau toObject mengaktifkan virtuals

// langkah-langkah menggunakan middleware di mongoose
// 1. buat skema mongoose
// 2. tambahkan middleware menggunakan skema.pre atau skema.post
// 3. tentukan hook yang akan digunakan (save, deleteOne, update, dll)
// 4. tambahkan logic yang akan dijalankan di dalam middleware
// 5. pastikan middleware berjalan sesuai dengan hook yang ditentukan