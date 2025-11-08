// Scroll fade-in animation
const elements = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  elements.forEach(el => {
    const rect = el.getBoundingClientRect().top;
    if (rect < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Coba ambil lokasi pengguna
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showJadwal, showDefault);
  } else {
    showDefault();
  }

  async function showJadwal(pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;

    try {
      const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${long}&method=2`);
      const data = await response.json();
      const waktu = data.data.timings;

      document.getElementById("lokasi").innerText = `📍 Lokasi: ${data.data.meta.timezone}`;
      document.getElementById("waktu-shalat").innerHTML = `
        <p>Subuh: ${waktu.Fajr}</p>
        <p>Dzuhur: ${waktu.Dhuhr}</p>
        <p>Ashar: ${waktu.Asr}</p>
        <p>Maghrib: ${waktu.Maghrib}</p>
        <p>Isya: ${waktu.Isha}</p>
      `;
    } catch (err) {
      console.error("Gagal memuat jadwal:", err);
      showDefault();
    }
  }

  function showDefault() {
    document.getElementById("lokasi").innerText = "📍 Lokasi: Default (Jakarta)";
    document.getElementById("waktu-shalat").innerHTML = `
      <p>Subuh: 04:30</p>
      <p>Dzuhur: 11:45</p>
      <p>Ashar: 15:10</p>
      <p>Maghrib: 17:55</p>
      <p>Isya: 19:05</p>
    `;
  }
});

// === NAVBAR SCROLL DETECTION ===
window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// === HERO SECTION: TYPEWRITER & AYAT DINAMIS ===
document.addEventListener("DOMContentLoaded", () => {
  const texts = [
    "Aktif • Kreatif • Berakhlakul Karimah",
    "Muda • Menginspirasi • Islami",
    "Bersama dalam Ukhuwah Islamiyah"
  ];
  const typeElem = document.getElementById("typewriter");
  let i = 0;

  function typeNext() {
    const text = texts[i];
    let j = 0;
    typeElem.textContent = "";
    typeElem.style.width = "0";

    const typing = setInterval(() => {
      if (j < text.length) {
        typeElem.textContent += text[j];
        j++;
      } else {
        clearInterval(typing);
        setTimeout(() => {
          i = (i + 1) % texts.length;
          typeNext();
        }, 2000);
      }
    }, 80);
  }
  // === INFO SLIDER OTOMATIS ===
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".info-card");
  let current = 0;

  function showNextCard() {
    cards[current].classList.remove("active");
    current = (current + 1) % cards.length;
    cards[current].classList.add("active");
  }

  setInterval(showNextCard, 5000);
});

// === PERBAIKAN JADWAL SHALAT ===
document.addEventListener("DOMContentLoaded", () => {
  const updateTime = document.getElementById("update-time");

  async function updateJadwal(lat, long) {
    try {
      const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${long}&method=2`);
      const data = await res.json();
      const waktu = data.data.timings;
      const tz = data.data.meta.timezone;
      const date = new Date().toLocaleTimeString();

      document.getElementById("lokasi").innerText = `📍 Lokasi: ${tz}`;
      document.getElementById("waktu-shalat").innerHTML = `
        <p>Subuh: ${waktu.Fajr}</p>
        <p>Dzuhur: ${waktu.Dhuhr}</p>
        <p>Ashar: ${waktu.Asr}</p>
        <p>Maghrib: ${waktu.Maghrib}</p>
        <p>Isya: ${waktu.Isha}</p>
      `;
      updateTime.textContent = `Terakhir diperbarui ${date}`;
    } catch (e) {
      console.error("Gagal update jadwal:", e);
      updateTime.textContent = "Gagal memuat jadwal.";
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => updateJadwal(pos.coords.latitude, pos.coords.longitude),
      () => updateJadwal(-6.2, 106.8) // default Jakarta
    );
  } else {
    updateJadwal(-6.2, 106.8);
  }
});


  typeNext();

  // Ayat dinamis
  const ayatList = [
    {
      arab: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      arti: "Sesungguhnya bersama kesulitan ada kemudahan.",
      sumber: "QS. Al-Insyirah: 6"
    },
    {
      arab: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
      arti: "Allah adalah cahaya langit dan bumi.",
      sumber: "QS. An-Nur: 35"
    },
    {
      arab: "فَاذْكُرُونِي أَذْكُرْكُمْ",
      arti: "Ingatlah kepada-Ku, niscaya Aku ingat kepadamu.",
      sumber: "QS. Al-Baqarah: 152"
    }
  ];

  const ayatElem = document.getElementById("ayat");
  let k = 0;
  setInterval(() => {
    const a = ayatList[k];
    ayatElem.innerHTML = `
      <p class="arab">${a.arab}</p>
      <p class="arti">"${a.arti}"</p>
      <span class="sumber">${a.sumber}</span>
    `;
    k = (k + 1) % ayatList.length;
  }, 8000);
});

// === FADE-IN SCROLL EFFECT ===
const fadeEls = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect().top;
    if (rect < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});

// === HERO PARALLAX SCROLL ===
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const scrollY = window.scrollY;
  hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
});

// === LIGHT PARTICLES DI HERO ===
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("div");
    particle.classList.add("light-particle");
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    hero.appendChild(particle);
  }
});

// === RIPPLE EFFECT BUTTON ===
document.querySelectorAll(".btn, button").forEach(btn => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = this.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// === STAGGER ANIMATION UNTUK CARD ===
const fadeUps = document.querySelectorAll(".fade-up");
const observerStagger = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), index * 150);
    }
  });
}, { threshold: 0.3 });
fadeUps.forEach(el => observerStagger.observe(el));

// === Jadwal Sholat Otomatis ===
async function ambilJadwalSholat() {
  try {
    // 1608 = ID lokasi Tangerang (bisa disesuaikan)
    const today = new Date();
    const tahun = today.getFullYear();
    const bulan = String(today.getMonth() + 1).padStart(2, '0');
    const tanggal = String(today.getDate()).padStart(2, '0');

    const url = `https://api.myquran.com/v2/sholat/jadwal/1608/${tahun}/${bulan}/${tanggal}`;
    const response = await fetch(url);
    const data = await response.json();

    const jadwal = data.data.jadwal;
    const teks = `🕒 Jadwal Sholat Hari Ini | Subuh: ${jadwal.subuh} | Dzuhur: ${jadwal.dzuhur} | Ashar: ${jadwal.ashar} | Maghrib: ${jadwal.maghrib} | Isya: ${jadwal.isya}`;
    
    document.getElementById("jadwal-sholat").textContent = teks;
  } catch (error) {
    document.getElementById("jadwal-sholat").textContent = "⚠️ Gagal memuat jadwal salat.";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", ambilJadwalSholat);

// === BURGER MENU ===
const burger = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');

burger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  burger.classList.toggle('toggle');
});



