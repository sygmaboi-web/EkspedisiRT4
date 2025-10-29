// Menunggu sampai semua konten HTML dimuat
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LOGIKA UNTUK PINDAH HALAMAN (FADE TRANSITION) ---

    const navLinks = document.querySelectorAll('nav ul li a');
    const pages = document.querySelectorAll('.page-section');
    const pageContainer = document.querySelector('.page-container'); // Perlu ini

    function showPage(pageId) {
        // Biar nggak aneh pas ganti, sementara set tinggi fix
        if (pageContainer) {
            const activePage = pageContainer.querySelector('.page-section.active');
            if (activePage) {
                pageContainer.style.minHeight = activePage.offsetHeight + 'px';
            }
        }


        // Loop semua halaman, sembunyikan semua
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Tampilkan halaman yang dituju
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            // Setelah transisi selesai, hapus minHeight biar dinamis lagi
             setTimeout(() => {
                if (pageContainer) {
                    pageContainer.style.minHeight = '';
                }
            }, 400); // Sesuaikan dengan durasi transisi CSS
        }

        // Selalu scroll ke atas setiap pindah "halaman"
        window.scrollTo(0, 0);
    }

    // Tambahkan event listener untuk setiap link navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // "profil"
            // Jangan ganti halaman kalau link yang diklik udah aktif
            const currentPage = document.querySelector('.page-section.active');
            if (!currentPage || currentPage.id !== targetId) {
                 showPage(targetId);
                 window.location.hash = targetId; // Ubah hash URL
            }

        });
    });

    // Cek hash di URL pas pertama kali buka
    function handleInitialLoad() {
        let initialPageId = 'beranda'; // Default
        if (window.location.hash) {
            const hashId = window.location.hash.substring(1);
            if (document.getElementById(hashId)) {
                initialPageId = hashId;
            }
        }
        showPage(initialPageId);
    }

    handleInitialLoad(); // Panggil fungsi saat load


    // --- 2. LOGIKA UNTUK MODAL (POP-UP) PROFIL ---

    const profilModalOverlay = document.getElementById('profilModal');
    const profilModalContent = profilModalOverlay.querySelector('.modal-content');
    const profilModalCloseBtn = document.getElementById('profilModalCloseBtn');
    const profilTriggers = document.querySelectorAll('.profil-trigger');

    // Ambil elemen di dalam modal profil
    const modalFoto = document.getElementById('modalFoto');
    const modalNama = document.getElementById('modalNama');
    const modalPeran = document.getElementById('modalPeran');
    const modalSekolah = document.getElementById('modalSekolah');
    const modalTelpFasilitator = document.getElementById('modalTelpFasilitator');
    const modalTelpAyah = document.getElementById('modalTelpAyah');
    const modalTelpIbu = document.getElementById('modalTelpIbu');

    // Loop setiap kartu profil dan tambahkan event listener
    profilTriggers.forEach(card => {
        card.addEventListener('click', function() {
            // 1. Ambil data dari 'data-' attributes
            const nama = this.dataset.nama;
            const foto = this.dataset.foto;
            const peran = this.dataset.peran;
            const sekolah = this.dataset.sekolah;
            const telpFasilitator = this.dataset.telpFasilitator;
            const telpAyah = this.dataset.telpAyah;
            const telpIbu = this.dataset.telpIbu;

            // 2. Masukkan data ke dalam modal profil
            modalFoto.src = foto;
            // Tambah error handling jika foto tidak ada
             modalFoto.onerror = function() { this.src = 'placeholder.png'; }; // Ganti 'placeholder.png' jika perlu
            modalNama.textContent = nama;
            modalPeran.textContent = peran;
            modalSekolah.textContent = "Asal Sekolah: " + sekolah;
            modalTelpFasilitator.textContent = "No. Fasilitator: " + telpFasilitator;
            modalTelpAyah.textContent = "No. Telp Ayah: " + telpAyah;
            modalTelpIbu.textContent = "No. Telp Ibu: " + telpIbu;

            // 3. Tampilkan modal profil dengan transisi
            profilModalOverlay.style.display = 'flex';
            setTimeout(() => {
                profilModalOverlay.style.opacity = '1';
                profilModalContent.style.transform = 'scale(1)';
            }, 10);
        });
    });

    // Fungsi untuk menutup modal profil
    function closeProfilModal() {
        profilModalOverlay.style.opacity = '0';
        profilModalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            profilModalOverlay.style.display = 'none';
        }, 300); // Sesuai durasi transisi CSS
    }

    // Tambahkan event listener untuk tombol close modal profil
    profilModalCloseBtn.addEventListener('click', closeProfilModal);

    // Tutup modal profil jika klik di luar
    profilModalOverlay.addEventListener('click', function(e) {
        if (e.target === profilModalOverlay) {
            closeProfilModal();
        }
    });


    // --- 3. LOGIKA BARU UNTUK MODAL (POP-UP) KEGIATAN ---

    const kegiatanModalOverlay = document.getElementById('kegiatanModal');
    const kegiatanModalContent = kegiatanModalOverlay.querySelector('.modal-content');
    const kegiatanModalCloseBtn = document.getElementById('kegiatanModalCloseBtn');
    const kegiatanModalBody = document.getElementById('kegiatanModalBody');
    const timelineTriggers = document.querySelectorAll('.timeline-trigger');

    // Loop setiap item timeline
    timelineTriggers.forEach(item => {
        item.addEventListener('click', function() {
            // 1. Cari konten detail yang tersembunyi di dalamnya
            const detailContent = this.querySelector('.timeline-detail-content');

            if (detailContent) {
                // 2. Salin isi HTML konten detail ke dalam modal
                kegiatanModalBody.innerHTML = detailContent.innerHTML;

                // 3. Tampilkan modal kegiatan
                kegiatanModalOverlay.style.display = 'flex';
                setTimeout(() => {
                    kegiatanModalOverlay.style.opacity = '1';
                    kegiatanModalContent.style.transform = 'scale(1)';
                }, 10);
            } else {
                console.error("Konten detail tidak ditemukan untuk item timeline ini.");
            }
        });
    });

     // Fungsi untuk menutup modal kegiatan
    function closeKegiatanModal() {
        kegiatanModalOverlay.style.opacity = '0';
        kegiatanModalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            kegiatanModalOverlay.style.display = 'none';
            kegiatanModalBody.innerHTML = ''; // Kosongkan isi modal setelah ditutup
        }, 300); // Sesuai durasi transisi CSS
    }

     // Tambahkan event listener untuk tombol close modal kegiatan
    kegiatanModalCloseBtn.addEventListener('click', closeKegiatanModal);

    // Tutup modal kegiatan jika klik di luar
    kegiatanModalOverlay.addEventListener('click', function(e) {
         if (e.target === kegiatanModalOverlay) {
            closeKegiatanModal();
        }
    });

     // (Opsional) Tutup modal dengan tombol Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            if (profilModalOverlay.style.opacity === '1') {
                closeProfilModal();
            }
            if (kegiatanModalOverlay.style.opacity === '1') {
                closeKegiatanModal();
            }
        }
    });


});
