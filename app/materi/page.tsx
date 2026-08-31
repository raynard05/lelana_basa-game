'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Home from '@/components/Home';
import Music from '@/components/Music';
import './materi.css';

export default function MateriPage() {
  const router = useRouter();

  return (
    <div className="mt-container">
      <Home className="mt-home-btn" />
      <Music className="mt-music-btn" />

      <div className="mt-content-wrapper">
        <div className="mt-content">

          <div className="mt-logo-container">
            <Image
              src="/materi/materitag.png"
              alt="Materi"
              width={600}
              height={250}
              className="mt-logo"
              priority
            />
          </div>

          <div className="mt-step-title">
            1. Capaian Pasinaon (CP)
          </div>
          <p className="mt-paragraph">
            <strong>Fase D, Elemen: Berbicara dan Mempresentasikan</strong><br/><br/>
            Peserta didik mampu menyampaikan gagasan, pikiran, pandangan, arahan atau pesan untuk tujuan pengajuan usul, pemecahan masalah, dan pemberian solusi secara lisan dalam bentuk monolog dan dialog logis, kritis, dan kreatif sesuai dengan tata krama. Peserta didik mampu menggunakan dan memaknai kosakata baru yang menggunakan basa rinengga/lalongèt untuk berbicara dan menyajikan gagasan sesuai unggah-ungguh basa. Peserta didik mampu berdiskusi secara aktif, kontributif, efektif, dan santun.
          </p>

          <div className="mt-step-title">
            2. Tujuwan Pasinaon (TP)
          </div>
          <p className="mt-paragraph">
            1. Mangerteni pangertosan lan werna-werna undha-usuk basa Jawa (ngoko lugu, ngoko alus, krama lugu, krama alus).<br/>
            2. Nemtokake ragam basa Jawa kang trep adhedhasar umur, kalungguhan, lan drajat mitra tutur.<br/>
            3. Praktek micara migunakake undha-usuk basa Jawa kanthi bener lan santun miturut konteks komunikasi.
          </p>

          <div className="mt-step-title">
            3. Apa Iku Undha-Usuk Basa Jawa?
          </div>
          <p className="mt-paragraph">
            Undha-usuk basa Jawa yaiku sistem tingkat tutur (tataran basa) sing ngatur panganggone ragam basa Jawa adhedhasar sesambungan sosial antarane panutur (sing ngomong) lan mitra tutur (sing diajak omong). Sistem iki dadi wujud tata krama lan kesantunan sajrone komunikasi basa Jawa, ora mung babagan apa sing diomongake, nanging uga sapa sing diajak ngomong, kepiye kahanane, lan kepiye sesambungane.<br/><br/>
            Kanggo nggampangake pasinaon, undha-usuk basa Jawa diperang dadi rong golongan gedhe, yaiku ngoko lan krama, kang saben-sabene isih diperang maneh dadi rong werna.
          </p>
          <div className="mt-image-container">
            <Image
              src="/materi/levelbasa.png"
              alt="Bagan Undha-Usuk Basa Jawa"
              width={800}
              height={450}
              className="mt-step-img"
            />
          </div>

          <div className="mt-step-title">
            4. Basa Ngoko
          </div>
          <p className="mt-paragraph">
            Digunakake nalika komunikasi karo wong sing wis rumaket, sapantaran umure, utawa kalungguhan sosiale padha. Ora ngemot rasa pakurmatan khusus, nanging kudu tetep dislarasake konteks komunikasi supaya ora dianggep kurang ngajeni.<br/><br/>
            <strong>a. Ngoko Lugu</strong><br/>
            Kabeh tembung, ater-ater, lan panambang nganggo basa ngoko, tanpa kacampuran tembung krama. Digunakake marang kanca, sadulur, utawa wong sing luwih enom.<br/>
            <strong>Tuladhane: "Kowe wis mangan apa durung?" (kabeh tembung migunakake basa ngoko)</strong><br/><br/>
            <strong>b. Ngoko Alus</strong><br/>
            Isih migunakake struktur ngoko, nanging kacampuran tembung krama inggil/krama madya kanggo nuduhake rasa hurmat. Digunakake nalika sesambungan raket nanging kepengin tetep santun (tuladhane: anak marang wong tuwa sing raket, murid marang guru sing wis kenal apik).<br/>
            <strong>Tuladhane: "Bapak wis dhahar apa durung?" (tembung "dhahar" krama inggil, struktur liyane ngoko)</strong>
          </p>

          <div className="mt-step-title">
            5. Basa Krama
          </div>
          <p className="mt-paragraph">
            Digunakake kanggo nuduhake rasa hurmat lan pakurmatan marang mitra tutur, umume marang wong sing luwih tuwa, durung raket, utawa duwe kalungguhan luwih dhuwur.<br/><br/>
            <strong>a. Krama Lugu</strong><br/>
            Kabeh tembung nganggo basa krama minangka unsur utama, tanpa krama inggil/krama madya kang dominan. Digunakake marang wong sing durung raket utawa drajate dianggep padha, supaya tetep santun tanpa pakurmatan kang banget.<br/>
            <strong>Tuladha: "Sampeyan sampun nedha napa dereng?" (kabeh tembung migunakake basa krama)</strong><br/><br/>
            <strong>b. Krama Alus</strong><br/>
            Migunakake tembung krama inggil kanggo pakurmatan paling dhuwur. Digunakake marang wong tuwa, guru, utawa wong sing dihurmati.<br/>
            <strong>Tuladha: "Panjenengan sampun dhahar menapa dereng?" (kabeh tembung migunakake krama inggil)</strong>
          </p>
          <div className="mt-image-container">
            <Image
              src="/materi/tabel_ringkesan.png"
              alt="Tabel Ringkesan Basa Krama"
              width={800}
              height={450}
              className="mt-step-img"
            />
          </div>

          <div className="mt-step-title">
            6. Cara Nemtokake Ragam Basa (Panduan Cepet)
          </div>
          <p className="mt-paragraph" style={{textAlign: 'center'}}>
            Sadurunge micara, siswa bisa takon marang awake dhewe:<br/>
            1. Sapa mitra tuture? (luwih tuwa / sapantaran / luwih enom)<br/>
            2. Kepiye sesambungane? (raket / durung raket / formal)<br/>
            3. Ing kahanan apa? (santai / resmi)<br/><br/>
            Uga bisa migunakake rumus basa ing ngisor iki:<br/>
            <strong>Rumus umum: Jejer + Wasesa + Lesan + Katrangan</strong><br/>
            <strong>Katrangan:</strong><br/>
            Jejer: Subjek (kata ganti orang) &nbsp;&nbsp; Lesan: objek (yang dikenai pekerjaan)<br/>
            Wasesa: Predikat (kata kerja) &nbsp;&nbsp; Katrangan: Keterangan tempat, waktu, latar, dll
          </p>
          <div className="mt-image-container">
            <Image
              src="/materi/rumus.png"
              alt="Rumus Undha Usuk Basa Jawa"
              width={800}
              height={450}
              className="mt-step-img"
            />
          </div>

          <button className="mt-back-btn" onClick={() => router.push('/menu')}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
