// Menunggu sampai semua konten HTML dimuat
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LOGIKA UNTUK PINDAH HALAMAN (FADE TRANSITION) ---
    const navLinks = document.querySelectorAll('nav ul li a');
    const pages = document.querySelectorAll('.page-section');
    const pageContainer = document.querySelector('.page-container');
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
                 window.location.hash = targetId;
            }

            // Otomatis tutup hamburger menu setelah link diklik
            if (navUl && hamburgerBtn) {
                navUl.classList.remove('nav-active');
                hamburgerBtn.classList.remove('active');
            }
        });
    });

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
            modalTelpFasilitator.textContent = "No. Fasilitator: " + data.telpFasilitator;
            modalTelpAyah.textContent = "No. Telp Ayah: " + data.telpAyah;
            modalTelpIbu.textContent = "No. Telp Ibu: " + data.telpIbu;

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

    // --- 3. LOGIKA MODAL (POP-UP) KEGIATAN ---
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

    // --- 4. LOGIKA BARU UNTUK HAMBURGER MENU ---
    if (hamburgerBtn && navUl) {
        hamburgerBtn.addEventListener('click', () => {
            navUl.classList.toggle('nav-active');
            hamburgerBtn.classList.toggle('active');
        });
    }

    // --- 5. LOGIKA BARU UNTUK GANTI MODE (DESKTOP/MOBILE) ---
    const modeSwitcherBtn = document.getElementById('mode-switcher-btn');
    const body = document.body;

    // Fungsi untuk update mode
    function setMode(mode) {
        if (mode === 'desktop') {
            body.classList.add('force-desktop-mode');
            modeSwitcherBtn.textContent = 'Tampilkan Versi HP';
            localStorage.setItem('mode', 'desktop');
            // Tutup menu HP jika kebuka
            navUl.classList.remove('nav-active');
            hamburgerBtn.classList.remove('active');
        } else {
            body.classList.remove('force-desktop-mode');
            modeSwitcherBtn.textContent = 'Tampilkan Versi Desktop';
            localStorage.setItem('mode', 'mobile');
        }
    }

    // Cek mode yang tersimpan saat load
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'desktop') {
        setMode('desktop');
    } else {
        setMode('mobile'); // Default
    }

    // Event listener untuk tombol ganti mode
    modeSwitcherBtn.addEventListener('click', () => {
        if (body.classList.contains('force-desktop-mode')) {
            setMode('mobile');
        } else {
            setMode('desktop');
        }
    });

});
