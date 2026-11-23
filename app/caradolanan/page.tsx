'use client';

import Image from 'next/image';
import Home from '@/components/Home';
import Music from '@/components/Music';
import './caradolanan.css';

export default function CaraDolananPage() {
  return (
    <div className="cd-container">
      <Home className="cd-home-btn" />
      <Music className="cd-music-btn" />

      <div className="cd-content-wrapper">
        <div className="cd-content">

          <div className="cd-logo-container">
            <Image
              src="/caranedolanan/pandom.png"
              alt="Pandom"
              width={600}
              height={250}
              className="cd-logo"
              priority
            />
          </div>

          <p className="cd-paragraph">
            Sadurunge mlebu tautan website Lelana Basa, panganggo disaranake ngganti setelan layar hapene dadi 30 menit supaya luwih gampang nalika dolanan Lelana Basa. Pesthekna jaringan internet ing panggonmu lumaku kanthi lancar.
          </p>

          <div className="cd-step-title">
            1. Kaca Wiwitan
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/register_rev.jpeg"
              alt="Kaca Wiwitan"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Panganggo bisa mbukak website Lelana Basa lumantar pranala sing wis disamektakake. Sawise diakses, sistem bakal nampilake kaca Wiwitan, panganggo bisa ngisi dhata dhiri luwih dhisik. Sawise ngisi, Panganggo bisa milih pandom “Mlebu”.
          </p>

          <div className="cd-step-title">
            2. Kaca Akun
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/login_rev.jpeg"
              alt="Kaca Akun"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Yen Panganggo wis duwe akun Lelana Basa, Panganggo bisa ngisi username lan kata sandi ing kaca akun. Sawise iku, Panganggo bisa milih pandom “Mlebu”.
          </p>

          <div className="cd-step-title">
            3. Kaca Menu Utama
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/menu_rev.jpeg"
              alt="Halaman Menu Utama"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Sawise milih pandom “Mlebu “ ing kaca akun, Panganggo bakal diarahake menyang menu utama medhia pasinaon iki. Ing kaca menu utama, ana sawetara pilihan, yaiku:<br />
            1. Pandom kanggo mbukak kaca pandhuan panganggone medhia Lelana Basa.<br />
            2. Materi kanggo mbukak materi undha usuk basa Jawa.<br />
            3. Wiwit Dolanan kanggo mbukak menu inti saka medhia pasinaon Lelana Basa.<br />
            4. Profil Pangembang kanggo mbukak informasi pangembang media pasinaon Lelana Basa.<br />
            5. Fitur pandom &quot;Wong&quot; ing bagean pojok kiwa dhuwur kanggo ngerteni informasi akun panganggo.<br />
            6. Fitur pandom“Speaker” ing bagean pojok tengen dhuwur kanggo nguripi utawa mateni backsound.<br />
            7. Fitur pandom “Logout” ing bagean pojok tengen ngisor kanggo metu saka menu utama Lelana Basa.
          </p>

          <div className="cd-step-title">
            4. Kaca Ringkesan Crita ing Menu Wiwit Dolanan
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/sinopsis_rev.jpeg"
              alt="Kaca Ringkesan Crita"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Ing kaca ringkesan crita, panganggo bakal disuguhi ringkesan crita lelakone Jaka Tulus. Ing kaca iki uga ana sawetara fitur, yaiku:<br />
            1. Fitur pandom “Omah” ing bagean kiwa dhuwur kanggo bali menyang kaca utama Lelana Basa.<br />
            2. Fitur pandom “Speaker” kanggo nguripi utawa mateni backsound.<br />
            3. Fitur pandom “Next” kanggo nerusake menyang kaca sabanjure.
          </p>

          <div className="cd-step-title">
            5. Kaca Analisis Paraga ing Menu Wiwit Dolanan
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
            Ing kaca analisis paraga, panganggo bakal diprentah kanggo nganalisis kalungguhan paraga, wiwit saka relasi sosiale, tingkat pakurmatan lan drajat sosiale slaras marang paraga kang wis cumawis ing kaca kasebut minangka misi kapisan ing Lelana Basa, yaiku:<br />
            1. Panganggo bakal diwenehi wektu 2 menit kanggo ngrampungake misi kasebut.<br />
            2. Panganggo bakal diwenehi 2 kalonggaran kanggo mangsuli.<br />
            3. Yen ing kalonggaran kapisan panganggo bisa mangsuli kanthi bener, sistem bakal ngarahake menyang kaca misi sabanjure kanthi skor 50.<br />
            4. Yen ing kalonggaran kapisan panganggo mangsuli kanthi salah, sistem bakal menehi kalonggaran kapindho marang panganggo kanthi skor 25.<br />
            5. Yen ing kalonggaran kapindho panganggo mangsuli kanthi salah, sistem bakal ngarahake menyang kaca misi sabanjure kanthi skor 0.
          </p>

          <div className="cd-step-title">
            6. Kaca Narasi ing Menu Wiwit Dolanan
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
            Ing kaca narasi, panganggo bisa ngrungokake narasi babak kasebut kanggo mangerteni alur crita. Sabanjure panganggo bisa milih pandom “Next” kanggo mlebu kaca misi sabanjure.
          </p>

          <div className="cd-step-title">
            7. Kaca Soal Tekstual ing Menu Wiwit Dolanan
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
            Ing kaca soal tekstual, panganggo bakal disuguhi maneka fitur, yaiku :<br />
            1. Ing bagean kiwa dhuwur ana katrangan babak, misi, lan skor sing wis diolehake.<br />
            2. Ing misi iki, panganggo diwenehi wektu 2 menit kanggo ngrampungake misi.<br />
            3. Panganggo diprentah kanggo milih pandom “Rungokna” kanggo ngrungokake dhialog paraga utama ing kaca kasebut.<br />
            4. Panganggo diprentah milih pandom “Speaker” ing saben pilihan jawaban (ngoko lugu, ngoko alus, krama lugu, krama alus) kanggo ngrungokake tata cara pangucap sing bener.<br />
            5. Panganggo diprentah milih pandom “Rekam Swaramu” kanggo mangsuli pitakonan saka paraga utama miturut pilihan wangsulan sing wis dicawisake.<br />
            6. Ing misi iki, panganggo bakal diwenehi 2 kalonggaran kanggo mangsuli.<br />
            7. Yen ing kalonggaran kapisan panganggo bisa mangsuli kanthi bener, bakal entuk skor 100.<br />
            8. Yen ing kalonggaran kapisan panganggo mangsuli kanthi salah, bakal diwenehi kalonggaran kapindho.<br />
            9. Yen ing kalonggaran kapindho panganggo mangsuli kanthi bener, bakal entuk skor 75.<br />
            10. Yen ing kalonggaran kapindho panganggo mangsuli kanthi salah, bakal entuk skor 0.
          </p>

          <div className="cd-step-title">
            8. Kaca Soal Kontekstual ing Menu Wiwit Dolanan
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
            Ing kaca soal kontekstual, panganggo bakal disuguhi maneka fitur, yaiku :<br />
            1. Ing bagean kiwa dhuwur ana katrangan babak, misi, lan skor sing wis diolehake.<br />
            2. Ing misi iki, panganggo diwenehi wektu 1 menit kanggo ngrampungake misi.<br />
            3. Panganggo diprentah milih pandom “Rungokna” kanggo ngrungokake dhialog paraga utama ing kaca kasebut.<br />
            4. Panganggo diprentah milih pandom “Rekam Swaramu” kanggo mangsuli pitakonan saka tokoh utama miturut ragam basa Jawa sing cocog karo status mitra tuture.<br />
            5. Ing misi iki, panganggo bakal diwenehi 2 kalonggaran kanggo mangsuli.<br />
            6. Yen ing kalonggaran kapisan panganggo bisa mangsuli siji tembung bener bakal entuk skor 50.<br />
            7. Yen ing kalonggaran kapisan panganggo bisa mangsuli rong tembung bener bakal entuk skor 75.<br />
            8. Yen ing kalonggaran kapisan panganggo bisa mangsuli luwih saka rong tembung bener bakal entuk skor 100.<br />
            9. Yen ing kalonggaran kapisan panganggo mangsuli kanthi salah, bakal diwenehi kalonggaran kapindho.<br />
            10. Yen ing kalonggaran kapindho panganggo mangsuli siji tembung bener, bakal entuk skor 25.<br />
            11. Yen ing kalonggaran kapindho panganggo mangsuli rong tembung bener, bakal entuk skor 50.<br />
            12. Yen ing kalonggaran kapindho panganggo mangsuli luwih saka rong tembung bener, bakal entuk skor 75.
          </p>

          <div className="cd-step-title">
            9. Kaca bebungah ing Menu Wiwit Dolanan
          </div>

          <div className="cd-image-container">
            <Image
              src="/caranedolanan/streak.webp"
              alt="Kaca Bebungah"
              width={800}
              height={450}
              className="cd-step-img"
            />
          </div>

          <p className="cd-paragraph">
            Ing kaca bebungah, panganggo bakal entuk bebungah arupa tambahan skor 25 poin, yen bisa mangsuli bener kanthi poin 100 ping 3 kanthi runtut.
          </p>

          <div className="cd-step-title">
            10. Kaca Perangkingan ing Menu Wiwit Dolanan
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
            1. Ing kaca Perangkingan, panganggo bakal diwenehi sawetara katrangan wiwit saka posisi rangking, jeneng jangkep, kelas, jumlah skor sing diolehake, lan wektu sing wis dirampungake nalika nggarap kabeh misi.<br />
            2. Panganggo diprentah kanggo milih pandom “Unduh PDF Ulasan Materi” minangka rangkuman evaluasi garapan saka website Lelana Basa.<br />
            3. Panganggo diprentah milih pandom “Home” kanggo bali menyang kaca utama.
          </p>
        </div>
      </div>
    </div>
  );
}
