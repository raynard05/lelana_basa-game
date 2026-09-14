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
            Sadurunge mlebu tautan website Lelana Basa, pangguna disaranake ngganti <strong>setelan layar hapene dadi 30 menit</strong> supaya luwih gampang nalika dolanan Lelana Basa. Pastikna <strong>jaringan internet ing panggonmu lumaku kanthi lancar.</strong>
          </p>

          <div className="cd-step-title">
            1. Kaca Registrasi
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/register.webp"
              alt="Kaca Registrasi"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Pangguna bisa mbukak website Lelana Basa liwat tautan sing wis disediakake. Sawise tautan diakses, sistem bakal nampilake kaca registrasi, pangguna bisa ngisi data dhiri luwih dhisik. Sawise ngisi, pangguna bisa ngeklik tombol "<strong>Wiwit Lelana</strong>" kanggo mlebu ing menu utama.
          </p>

          <div className="cd-step-title">
            2. Kaca Registrasi Akun
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/login.webp"
              alt="Kaca Registrasi Akun"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Yen pangguna wis duwe akun Lelana Basa, pangguna bisa ngisi <strong>username lan kata sandi</strong> ing kaca registrasi akun. Sawise iku, pangguna bisa ngeklik tombol "<strong>Wiwiti</strong>" kanggo mlebu ing menu utama.
          </p>

          <div className="cd-step-title">
            3. Kaca Menu Utama
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
            Sawise ngeklik tombol "<strong>wiwiti</strong>" ing kaca registrasi, pangguna bakal diarahake menyang menu utama media pasinaon iki. Ing kaca menu utama, ana sawetara pilihan, yaiku:<br />
            <strong>1. Materi</strong> kanggo mbukak materi undha usuk basa Jawa.<br />
            <strong>2. Carane Dolanan</strong> kanggo mbukak kaca pandhuan panganggone media Lelana Basa.<br />
            <strong>3. Wiwiti</strong> kanggo mbukak menu inti saka media pasinaon Lelana Basa.<br />
            <strong>4. Profil Pangembang</strong> kanggo mbukak informasi pangembang media pasinaon Lelana Basa.<br />
            <strong>5.</strong> Fitur tombol "<strong>wong</strong>" ing bagean pojok kiwa dhuwur kanggo ngerteni informasi akun pangguna.<br />
            <strong>6.</strong> Fitur tombol "<strong>Speaker</strong>" ing bagean pojok tengen dhuwur kanggo nguripake utawa mateni backsound.<br />
            <strong>7.</strong> Fitur tombol "<strong>Logout</strong>" ing bagean pojok tengen ngisor kanggo metu saka menu utama Lelana Basa.
          </p>

          <div className="cd-step-title">
            4. Kaca Sinopsis ing Menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/sinopsis.webp"
              alt="Kaca Sinopsis"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Ing kaca sinopsis, pangguna bakal diwenehi sinopsis lelakone Jaka Tulus. Ing kaca sinopsis uga ana sawetara fitur, yaiku:<br />
            1. Fitur tombol "<strong>Omah</strong>" ing bagean kiwa dhuwur kanggo bali menyang kaca utama game Lelana Basa.<br />
            2. Fitur tombol "<strong>Speaker</strong>" kanggo nguripake utawa mateni backsound.<br />
            3. Fitur tombol "<strong>Next</strong>" kanggo nerusake menyang kaca sabanjure.
          </p>

          <div className="cd-step-title">
            5. Kaca Analisis Paraga ing Menu Wiwiti
          </div>

          <div className="cd-multi-image-container">
            <div className="cd-image-container">
              <Image
                src="/caranedolanan/a.png"
                alt="Relasi Sosial"
                width={800}
                height={450}
                className="cd-step-img"
              />
            </div>
            <div className="cd-image-container">
              <Image
                src="/caranedolanan/b.png"
                alt="Tingkat Pakurmatan"
                width={800}
                height={450}
                className="cd-step-img"
              />
            </div>
            <div className="cd-image-container">
              <Image
                src="/caranedolanan/c.png"
                alt="Drajat Sosial"
                width={800}
                height={450}
                className="cd-step-img"
              />
            </div>
          </div>

          <p className="cd-paragraph">
            Ing kaca analisis paraga, pangguna bakal prentah kanggo <strong>nganalisis kalungguhan paraga, wiwit saka relasi sosiale, tingkat pakurmatan lan drajat sosiale slaras marang paraga kang wis sumawis</strong> ing kaca kasebut minangka misi kapisan ing game Lelana Basa. Dene aturane game iki, yaiku:<br />
            1. Pangguna bakal diwenehi <strong>wektu 2 menit</strong> kanggo ngrampungake misi kasebut.<br />
            2. Pangguna bakal diwenehi <strong>2 kesempatan mangsuli.</strong><br />
            3. Yen ing kesempatan kapisan pangguna bisa njawab kanthi bener, sistem bakal ngarahake menyang kaca misi sabanjure. Lan <strong>entuk skor 50</strong><br />
            4. Yen ing kesempatan kapisan pangguna njawab kanthi salah, sistem bakal menehi kesempatan kapindho marang pangguna. Lan <strong>entuk skor 25</strong><br />
            5. Yen ing kesempatan kapindho pangguna njawab kanthi salah, sistem bakal ngarahake menyang kaca misi sabanjure <strong>kanthi skor 0</strong>.
          </p>

          <div className="cd-step-title">
            6. Kaca Narasi ing Menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/narasi.jpeg"
              alt="Kaca Narasi"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Ing kaca narasi, pangguna bisa ngrungokake narasi babak kasebut kanggo mangerteni alur critane. Sabanjure pangguna bisa ngeklik tombol "<strong>Next</strong>" kanggo mlebu kaca misi sabanjure.
          </p>

          <div className="cd-step-title">
            7. Kaca Soal Tekstual ing Menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/soal_tipe_2.webp"
              alt="Kaca Soal Tekstual"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Ing kaca soal tekstual, pangguna bakal diwenehi maneka pilihan fitur, yaiku :<br />
            1. Ing bagean kiwa dhuwur ana <strong>katerangan babak, misi, lan skor sing wis diolehake.</strong><br />
            2. Ing misi iki, pangguna diwenehi <strong>wektu 2 menit</strong> kanggo ngrampungake misi.<br />
            3. Pangguna didhawuhi kanggo ngeklik tombol "<strong>Rungokna</strong>" kanggo ngrungokake dialog paraga utama ing kaca kasebut.<br />
            4. Pangguna didhawuhi ngeklik tombol "<strong>Speaker</strong>" ing saben pilihan jawaban (<strong>ngoko lugu, ngoko alus, krama lugu, krama alus</strong>) kanggo ngrungokake tata cara pangucap sing bener.<br />
            5. Pangguna didhawuhi mencet tombol "<strong>Rekam Swaramu</strong>" kanggo njawab pitakonan saka paraga utama miturut pilihan jawaban sing wis disediakake.<br />
            6. Ing misi iki, pangguna bakal diwenehi <strong>2 kesempatan kanggo njawab.</strong><br />
            7. Yen ing kesempatan kapisan pangguna bisa njawab kanthi bener, bakal <strong>entuk skor 100</strong> lan diarahake menyang misi sabanjure.<br />
            8. Yen ing kesempatan kapisan pangguna njawab kanthi salah, <strong>bakal diwenehi kesempatan kapindho.</strong><br />
            9. Yen ing kesempatan kapindho pangguna njawab kanthi bener, bakal <strong>entuk skor 75</strong> lan diarahake menyang misi sabanjure.<br />
            10. Yen ing kesempatan kapindho pangguna njawab kanthi salah, bakal <strong>entuk skor 0</strong> lan diarahake menyang misi sabanjure.
          </p>

          <div className="cd-step-title">
            8. Kaca Soal Kontekstual ing Menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/soal_tipe_3.webp"
              alt="Kaca Soal Kontekstual"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Ing kaca soal kontekstual, pangguna bakal diwenehi maneka pilihan fitur, yaiku :<br />
            1. Ing bagean kiwa dhuwur ana <strong>katerangan babak, misi, lan skor sing wis diolehake.</strong><br />
            2. Ing misi iki, pangguna diwenehi <strong>wektu 1 menit</strong> kanggo ngrampungake misi.<br />
            3. Pangguna didhawuhi ngeklik tombol "<strong>Rungokna</strong>" kanggo ngrungokake dialog paraga utama ing kaca kasebut.<br />
            4. Pangguna didhawuhi mencet tombol "<strong>Rekam Swaramu</strong>" kanggo njawab pitakonan saka tokoh utama <strong>miturut ragam basa Jawa sing cocog karo status mitra tuture.</strong><br />
            5. Ing misi iki, pangguna bakal diwenehi <strong>2 kesempatan kanggo njawab.</strong><br />
            6. Yen ing kesempatan kapisan pangguna bisa njawab <strong>siji tembung bener</strong> bakal <strong>entuk skor 50</strong> lan diarahake menyang misi sabanjure.<br />
            7. Yen ing kesempatan kapisan pangguna bisa njawab <strong>rong tembung bener</strong> bakal <strong>entuk skor 75</strong> lan diarahake menyang misi sabanjure.<br />
            8. Yen ing kesempatan kapisan pangguna bisa njawab <strong>luwih saka rong tembung bener</strong> bakal <strong>entuk skor 100</strong> lan diarahake menyang misi sabanjure.<br />
            9. Yen ing kesempatan kapisan pangguna njawab kanthi salah, <strong>bakal diwenehi kesempatan kapindho.</strong><br />
            10. Yen ing kesempatan kapindho pangguna njawab <strong>siji tembung bener</strong>, bakal <strong>entuk skor 25</strong> lan diarahake menyang misi sabanjure.<br />
            11. Yen ing kesempatan kapindho pangguna njawab <strong>rong tembung bener</strong>, bakal <strong>entuk skor 50</strong> lan diarahake menyang misi sabanjure.<br />
            12. Yen ing kesempatan kapindho pangguna njawab <strong>luwih saka rong tembung bener</strong>, bakal <strong>entuk skor 75</strong> lan diarahake menyang misi sabanjure.
          </p>

          <div className="cd-step-title">
            9. Kaca Reward ing Menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/streak.webp"
              alt="Kaca Reward"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Ing kaca reward, pangguna bakal <strong>entuk reward yen bisa njawab bener kanthi poin 100 kaping 3 kanthi runtut.</strong> Mula bakal entuk reward arupa <strong>tambahan skor 25 poin.</strong>
          </p>

          <div className="cd-step-title">
            10. Kaca Perangkingan ing Menu Wiwiti
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/rangking.webp"
              alt="Kaca Perangkingan"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            1. Ing kaca Perangkingan, pangguna bakal diwenehi sawetara katerangan wiwit saka <strong>posisi rangking, jeneng lengkap, kelas, jumlah skor sing diolehake, lan wektu sing wis dirampungake nalika nggarap kabeh misi.</strong><br />
            2. Pangguna bakal didhawuhi ngeklik tombol "<strong>Unduh PDF Ulasan Materi</strong>" minangka <strong>rangkuman evaluasi garapan saka website Lelana Basa.</strong><br />
            3. Pangguna didhawuhi ngeklik tombol "<strong>Home</strong>" kanggo bali menyang kaca utama.
          </p>

          <button className="cd-back-btn" onClick={() => router.push('/menu')}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
