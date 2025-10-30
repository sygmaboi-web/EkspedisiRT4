// [BARU] Fungsi helper untuk format nomor WA
function formatWaLink(phone) {
    if (!phone || phone === '-') {
        return null; // Kembalikan null jika tidak ada nomor
    }
    // Hapus spasi, strip, dan ganti 0 di depan dengan 62
    let formattedPhone = phone.replace(/-/g, '').replace(/ /g, '');
    if (formattedPhone.startsWith('0')) {
        formattedPhone = '62' + formattedPhone.substring(1);
    }
    // Cek lagi jika masih ada karakter aneh
    if (!/^[0-9]+$/.test(formattedPhone)) {
        return null;
    }
    return `https://wa.me/${formattedPhone}`;
}


document.addEventListener('DOMContentLoaded', function() {

    const navLinks = document.querySelectorAll('nav ul li a');
    const pages = document.querySelectorAll('.page-section');
    const pageContainer = document.querySelector('.page-container');
    
    // [BARU] Ambil elemen menu hamburger
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navUl = document.querySelector('nav ul');

    function showPage(pageId) {
        if (pageContainer) {
            const activePage = pageContainer.querySelector('.page-section.active');
            if (activePage) {
                pageContainer.style.minHeight = activePage.offsetHeight + 'px';
            }
        }

        pages.forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
             setTimeout(() => {
                if (pageContainer) {
                    pageContainer.style.minHeight = '';
                }
            }, 400); 
        }
        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const currentPage = document.querySelector('.page-section.active');
            
            if (!currentPage || currentPage.id !== targetId) {
                 showPage(targetId);
                 // Tidak perlu `window.location.hash = targetId;` karena akan scroll
            }

            // [BARU] Otomatis tutup hamburger menu setelah link diklik
            if (navUl && hamburgerBtn) {
                navUl.classList.remove('nav-active');
                hamburgerBtn.classList.remove('active');
            }
        });
    });

    // (Logika Pindah Halaman Anda sudah bagus, saya sesuaikan sedikit)
    function handleInitialLoad() {
        let initialPageId = 'beranda'; 
        if (window.location.hash) {
            const hashId = window.location.hash.substring(1);
            if (document.getElementById(hashId)) {
                initialPageId = hashId;
            }
        }
        showPage(initialPageId);
    }
    handleInitialLoad(); 


    // --- 2. LOGIKA MODAL (POP-UP) PROFIL ---

    const profilModalOverlay = document.getElementById('profilModal');
    const profilModalContent = profilModalOverlay.querySelector('.modal-content');
    const profilModalCloseBtn = document.getElementById('profilModalCloseBtn');
    const profilTriggers = document.querySelectorAll('.profil-trigger');

    const modalFoto = document.getElementById('modalFoto');
    const modalNama = document.getElementById('modalNama');
    const modalPeran = document.getElementById('modalPeran');
    const modalSekolah = document.getElementById('modalSekolah');
    
    // [DIUBAH] Elemen ini sekarang adalah <a>, bukan <p>
    const modalTelpFasilitator = document.getElementById('modalTelpFasilitator');
    const modalTelpAyah = document.getElementById('modalTelpAyah');
    const modalTelpIbu = document.getElementById('modalTelpIbu');

    profilTriggers.forEach(card => {
        card.addEventListener('click', function() {
            const data = this.dataset;

            modalFoto.src = data.foto;
            modalFoto.onerror = function() { this.src = 'placeholder.png'; }; 
            modalNama.textContent = data.nama;
            modalPeran.textContent = data.peran;
            modalSekolah.textContent = "Asal Sekolah: " + data.sekolah;

            // --- [LOGIKA BARU UNTUK LINK WA] ---

            // 1. Proses Link Fasilitator
            const waFas = formatWaLink(data.telpFasilitator);
            if (waFas) {
                modalTelpFasilitator.textContent = "Kontak Fasilitator: " + data.telpFasilitator;
                modalTelpFasilitator.href = waFas;
                modalTelpFasilitator.style.display = 'block'; // Tampilkan
            } else {
                modalTelpFasilitator.style.display = 'none'; // Sembunyikan
            }

            // 2. Proses Link Ayah
            const waAyah = formatWaLink(data.telpAyah);
            if (waAyah) {
                modalTelpAyah.textContent = "Kontak Ayah: " + data.telpAyah;
                modalTelpAyah.href = waAyah;
                modalTelpAyah.style.display = 'block';
            } else {
                modalTelpAyah.style.display = 'none';
            }

            // 3. Proses Link Ibu
            const waIbu = formatWaLink(data.telpIbu);
            if (waIbu) {
                modalTelpIbu.textContent = "Kontak Ibu: " + data.telpIbu;
                modalTelpIbu.href = waIbu;
                modalTelpIbu.style.display = 'block';
            } else {
                modalTelpIbu.style.display = 'none';
            }
            // --- [AKHIR LOGIKA BARU] ---


            profilModalOverlay.style.display = 'flex';
            setTimeout(() => {
                profilModalOverlay.style.opacity = '1';
                profilModalContent.style.transform = 'scale(1)';
            }, 10);
        });
    });

    function closeProfilModal() {
        profilModalOverlay.style.opacity = '0';
        profilModalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            profilModalOverlay.style.display = 'none';
        }, 300); 
    }
    profilModalCloseBtn.addEventListener('click', closeProfilModal);
    profilModalOverlay.addEventListener('click', function(e) {
        if (e.target === profilModalOverlay) {
            closeProfilModal();
        }
    });


    // --- 3. LOGIKA MODAL (POP-UP) KEGIATAN (Tidak Berubah) ---

    const kegiatanModalOverlay = document.getElementById('kegiatanModal');
    const kegiatanModalContent = kegiatanModalOverlay.querySelector('.modal-content');
    const kegiatanModalCloseBtn = document.getElementById('kegiatanModalCloseBtn');
    const kegiatanModalBody = document.getElementById('kegiatanModalBody');
    const timelineTriggers = document.querySelectorAll('.timeline-trigger');

    timelineTriggers.forEach(item => {
        item.addEventListener('click', function() {
            const detailContent = this.querySelector('.timeline-detail-content');
            if (detailContent) {
                kegiatanModalBody.innerHTML = detailContent.innerHTML;
                kegiatanModalOverlay.style.display = 'flex';
                setTimeout(() => {
                    kegiatanModalOverlay.style.opacity = '1';
                    kegiatanModalContent.style.transform = 'scale(1)';
                }, 10);
            } else {
                console.error("Konten detail tidak ditemukan.");
            }
        });
    });

     function closeKegiatanModal() {
        kegiatanModalOverlay.style.opacity = '0';
        kegiatanModalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            kegiatanModalOverlay.style.display = 'none';
            kegiatanModalBody.innerHTML = '';
        }, 300);
    }
    kegiatanModalCloseBtn.addEventListener('click', closeKegiatanModal);
    kegiatanModalOverlay.addEventListener('click', function(e) {
         if (e.target === kegiatanModalOverlay) {
             closeKegiatanModal();
         }
    });

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

    // --- [4. LOGIKA BARU UNTUK HAMBURGER MENU] ---
    if (hamburgerBtn && navUl) {
        hamburgerBtn.addEventListener('click', () => {
            navUl.classList.toggle('nav-active');
            hamburgerBtn.classList.toggle('active');
        });
    }

});
