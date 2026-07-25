'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Home from '@/components/Home';
import Music from '@/components/Music';
import './caradolanan.css';

export default function CaraDolananPage() {
  const router = useRouter();

  return (
    <div className="cd-container">
      <Home className="cd-home-btn" />
      <Music className="cd-music-btn" />
      
      <div className="cd-content-wrapper">
        <div className="cd-content">
          
          <div className="cd-logo-container">
            <Image 
              src="/caranedolanan/logo.webp" 
              alt="Carane Dolanan" 
              width={600} 
              height={250} 
              className="cd-logo"
              priority
            />
          </div>

          <p className="cd-paragraph">
            Sebelum memasuki tautan website Lelana Basa, pengguna diharapkan mengubah <strong>setelan layar handphone</strong> menjadi <strong>30 menit</strong> agar memudahkan pengguna dalam memainkan game website Lelana Basa. Pastikan <strong>jaringan internet</strong> di tempat pengguna, berjalan dengan lancar.
          </p>

          <div className="cd-step-title">
            1. Halaman Registrasi
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/register.webp"
              alt="Halaman Registrasi"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Pengguna dapat membuka website Lelana Basa melalui tautan yang telah disediakan. Setelah tautan diakses, sistem akan menampilkan halaman registrasi agar pengguna dapat mengisi data diri terlebih dahulu. Setelah mengisi pengguna dapat meng-klik tombol "<strong>Wiwit Lelana</strong>" untuk masuk ke halaman menu utama.
          </p>

          <div className="cd-step-title">
            2. Halaman Registrasi Akun
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/login.webp"
              alt="Halaman Registrasi Akun"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Jika pengguna sudah memilik akun Lelana Basa, pengguna dapat mengisi <strong>username dan kata sandi</strong> pada halaman registrasi akun. Setelah itu, pengguna bisa meng-klik tombol "<strong>Wiwiti</strong>" untuk masuk pada halaman utama menu.
          </p>

          <div className="cd-step-title">
            3. Mode Layar Horizontal
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/guard.webp"
              alt="Mode Layar Horizontal"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Apabila muncul pemberitahuan seperti diatas, diharapkan pengguna dapat <strong>mengubah posisi handphone dari posisi vertikal menjadi posisi horizontal</strong>. Kemudian <strong>tap layar agar menjadi fullscreen</strong>.
          </p>

          <div className="cd-step-title">
            4. Halaman Menu Utama
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/menu_fix.jpeg"
              alt="Halaman Menu Utama"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Setelah meng-klik tombol "<strong>wiwiti</strong>" pada halaman registrasi, pengguna akan diarahkan sistem menuju menu utama media pembelajaran ini. Pada halaman menu utama, terdapat beberapa pilihan yaitu:<br />
            <strong>1. Materi</strong> untuk mengakses pengantar materi undha usuk basa Jawa.<br />
            <strong>2. Carane Dolanan</strong> untuk mengakses halaman panduan penggunaan media Lelana Basa.<br />
            <strong>3. Wiwiti</strong> untuk mengakses menu inti dari media pembelajaran game Lelana Basa.<br />
            <strong>4. Profil Pangembang</strong> untuk mengakses informasi pengembang media pembelajaran Lelana Basa.<br />
            <strong>5.</strong> Fitur tombol "<strong>orang</strong>" di bagian pojok kiri atas untuk mengetahui informasi akun pengguna.<br />
            <strong>6.</strong> Fitur tombol "<strong>Speaker</strong>" di bagian pojok kanan atas untuk mengaktifkan atau menonaktifkan backsound.<br />
            <strong>7.</strong> Fitur tombol "<strong>Logout</strong>" di bagian pojok kanan bawah untuk keluar dari menu utama Lelana Basa.
          </p>

          <div className="cd-step-title">
            5. Halaman Sinopsis pada Menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/sinopsis.webp"
              alt="Halaman Sinopsis"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Pada halaman sinopsis, pengguna akan disajikan sinopsis dari perjalanan Jaka Tulus. Pada halaman sinopsis juga terdapat beberapa fitur, yaitu:<br />
            1. Fitur tombol "<strong>Home</strong>" di bagian kiri atas untuk kembali ke halaman utama game Lelana Basa.<br />
            2. Fitur tombol "<strong>Speaker</strong>" untuk mengaktifkan atau menonaktifkan backsound.<br />
            3. Fitur tombol "<strong>Next</strong>" untuk lanjut ke halaman selanjutnya.
          </p>

          <div className="cd-step-title">
            6. Halaman Analisis Paraga pada menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/soal_tipe_1.webp"
              alt="Halaman Analisis Paraga"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Pada halaman analisis paraga, pengguna akan diperintahkan untuk <strong>menganalisis status paraga</strong> (luwih tuwa, sapantaran utawa luwih enom) <strong>sesuai dengan tokoh yang terdapat</strong> pada halaman tersebut sebagai misi pertama dalam game Lelana Basa. Adapun aturan dalam game ini, yaitu:<br />
            1. Pengguna akan diberikan <strong>waktu selama 1 menit</strong> untuk menyelesaikan misi tersebut.<br />
            2. Pengguna akan diberikan <strong>2 kali kesempatan menjawab</strong>.<br />
            3. Apabila pada kesempatan pertama pengguna dapat menjawab dengan benar, maka sistem akan mengarahkan pada halaman misi selanjutnya. Dan <strong>memperoleh skor 100</strong><br />
            4. Apabila pada kesempatan pertama pengguna menjawab dengan salah, maka sistem akan memberikan kesempatan kedua pada pengguna. Dan <strong>memperoleh skor 75</strong><br />
            5. Apabila pada kesempatan kedua pengguna menjawab dengan salah, maka sistem akan mengarahkan pada halaman misi selanjutnya <strong>dengan skor 0</strong>.
          </p>

          <div className="cd-step-title">
            7. Halaman Narasi pada Menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/narasi.jpeg"
              alt="Halaman Narasi"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Pada halaman narasi, pengguna akan diperintahkan untuk meng-klik kolom "<strong>Rungokna Narasi</strong>" untuk mendengar narasi pada babak tersebut. Kemudian pengguna dapat meng-klik tombol "<strong>Next</strong>" untuk masuk ke halaman misi selanjutnya.
          </p>

          <div className="cd-step-title">
            8. Halaman Soal Tekstual pada Menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/soal_tipe_2.webp"
              alt="Halaman Soal Tekstual"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            1. Pada bagian kiri atas terdapat <strong>keterangan babak, misi dan skor yang telah diperoleh</strong>.<br />
            2. Pada misi ini, pengguna diberikan <strong>waktu selama 2 menit</strong> untuk menyelesaikan misi.<br />
            3. Pengguna diperintahkan meng-klik tombol "<strong>Rungokna</strong>" untuk mendengarkan dialog tokoh utama pada halaman tersebut.<br />
            4. Pengguna diperintahkan meng-klik tombol "<strong>Speaker</strong>" pada tiap pilihan jawaban (ngoko lugu, ngoko alus, krama lugu, krama alus) untuk mendengarkan cara pelafalan yang benar pada tiap kata yang tersedia.<br />
            5. Pengguna diperintahkan untuk menekan tombol "<strong>Rekam Swaramu</strong>" untuk menjawab pertanyaan dari tokoh utama sesuai dengan pilihan jawaban yang telah disediakan.<br />
            6. Pada misi ini, pengguna akan diberikan <strong>2 kali kesempatan dalam menjawab</strong>.<br />
            7. Apabila pada kesempatan pertama pengguna berhasil menjawab dengan benar maka akan <strong>memperoleh skor 100</strong> dan diarahkan menuju misi selanjutnya.<br />
            8. Apabila pada kesempatan pertama pengguna menjawab dengan salah, <strong>maka akan diberikan kesempatan kedua</strong>.<br />
            9. Apabila pada kesempatan kedua pengguna menjawab dengan benar, maka akan <strong>memperoleh skor 75</strong> dan diarahkan menuju misi selanjutnya.<br />
            10. Apabila pada kesempatan kedua pengguna menjawab dengan salah, maka akan <strong>memperoleh skor 0</strong> dan diarahkan menuju misi selanjutnya.
          </p>

          <div className="cd-step-title">
            9. Halaman Soal Kontekstual pada Menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/soal_tipe_3.webp"
              alt="Halaman Soal Kontekstual"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Pada halaman soal tekstual pengguna akan disajikan berbagai pilihan fitur yaitu :<br />
            1. Pada bagian kiri atas terdapat <strong>keterangan babak, misi dan skor yang telah diperoleh</strong>.<br />
            2. Pada misi ini, pengguna diberikan <strong>waktu selama 1 menit</strong> untuk menyelesaikan misi.<br />
            3. Pengguna diperintahkan meng-klik tombol "<strong>Rungokna</strong>" untuk mendengarkan dialog tokoh utama pada halaman tersebut.<br />
            4. Pengguna diperintahkan untuk menekan tombol "<strong>Rekam Swaramu</strong>" untuk menjawab pertanyaan dari tokoh utama <strong>sesuai dengan tingkat undha usuk basa Jawa yang sesuai dengan status lawan bicaranya.</strong><br />
            5. Pada misi ini, pengguna akan diberikan <strong>2 kali kesempatan dalam menjawab.</strong><br />
            6. Apabila pada kesempatan pertama pengguna berhasil menjawab dengan <strong>satu kata benar</strong> maka akan <strong>memperoleh skor 50</strong> dan diarahkan menuju misi selanjutnya.<br />
            7. Apabila pada kesempatan pertama pengguna berhasil menjawab dengan <strong>dua kata benar</strong> maka akan <strong>memperoleh skor 75</strong> dan diarahkan menuju misi selanjutnya.<br />
            8. Apabila pada kesempatan pertama pengguna berhasil menjawab dengan <strong>lebih dari dua kata benar</strong> maka akan <strong>memperoleh skor 100</strong> dan diarahkan menuju misi selanjutnya.<br />
            9. Apabila pada kesempatan pertama pengguna menjawab dengan salah, maka akan diberikan <strong>kesempatan kedua.</strong><br />
            10. Apabila pada kesempatan kedua pengguna menjawab dengan <strong>satu kata benar</strong>, maka akan <strong>memperoleh skor 25</strong> dan diarahkan menuju misi selanjutnya.<br />
            11. Apabila pada kesempatan kedua pengguna menjawab dengan <strong>dua kata benar</strong>, maka akan <strong>memperoleh skor 50</strong> dan diarahkan menuju misi selanjutnya.<br />
            12. Apabila pada kesempatan kedua pengguna menjawab dengan <strong>lebih dari dua kata benar</strong>, maka akan <strong>memperoleh skor 75</strong> dan diarahkan menuju misi selanjutnya.
          </p>

          <div className="cd-step-title">
            10. Halaman Reward pada Menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/streak.webp"
              alt="Halaman Reward"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Pada halaman reward, pengguna akan <strong>memperoleh reward apabila berhasil menjawab dengan benar dengan poin 100 sebanyak 3 kali berturut-turut.</strong> Maka akan mendapatkan reward berupa <strong>tambahan skor sebanyak 25 poin.</strong>
          </p>

          <div className="cd-step-title">
            11. Halaman Perangkingan pada Menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/rangking.webp"
              alt="Halaman Perangkingan"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            1. Pada halaman Perangkingan, pengguna akan disajikan beberapa keterangan mulai dari <strong>posisi rangking, nama lengkap, kelas, jumlah skor yang diperoleh serta waktu yang telah diselesaikan dalam mengerjakan seluruh misi.</strong><br />
            2. Pengguna akan diperintahkan untuk meng-klik tombol "<strong>Unduh PDF Ulasan Materi</strong>" sebagai bentuk <strong>rangkuman evaluasi pengerjaan game Lelana Basa.</strong><br />
            3. Pengguna diperintahkan untuk meng-klik tombol "<strong>Home</strong>" untuk kembali ke halaman utama.
          </p>

          <div className="cd-step-title">
            12. Halaman PDF Ulasan Materi
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/dokumen.jpeg"
              alt="Halaman PDF Ulasan Materi"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Setelah meng-klik dan mengunduh "<strong>PDF Ulasan Materi</strong>" pengguna akan mendapatkan <strong>PDF ulasan materi yang berisi identitas, skor, waktu pengerjaan, kunci jawaban dan rangkuman jawaban</strong> yang telah dimasukkan oleh pengguna.
          </p>

          <button className="cd-back-btn" onClick={() => router.push('/menu')}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
