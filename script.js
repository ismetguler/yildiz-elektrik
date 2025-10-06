document.addEventListener('DOMContentLoaded', () => {

    // Temel Elementler
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const header = document.querySelector('header');

    // Splash Screen (Açýlýþ Ekraný) Yönetimi
    // Sadece index.html'de ve oturumun ilk giriþinde göster
    if (splashScreen) {

        const isFirstVisit = !sessionStorage.getItem('yildizElektrikVisited');
        const delay = 2000; // Splash bekleme süresi (2 saniye)

        if (isFirstVisit) {
            // Ýlk ziyaretse splash'i göster ve zamanlayýcýyý baþlat

            // Ana içeriði ilk baþta görünmez yap
            if (mainContent) mainContent.style.opacity = '0';

            setTimeout(() => {
                splashScreen.style.opacity = '0'; // Yumuþak solma baþlat

                // Opaklýk geçiþi bittikten sonra görünürlüðü ayarla
                splashScreen.addEventListener('transitionend', () => {
                    splashScreen.style.display = 'none';
                });

                // Ana içeriði göster
                if (mainContent) mainContent.style.opacity = '1';

                // Ziyaret edildi iþaretini koy (Oturum boyunca bir daha çýkmaz)
                sessionStorage.setItem('yildizElektrikVisited', 'true');

            }, delay);

        } else {
            // ÝLK ZÝYARET DEÐÝLSE: Splash'i hemen gizle ve içeriði göster
            splashScreen.style.display = 'none';
            if (mainContent) mainContent.style.opacity = '1';
        }
    }


    // Yapýþkan Header ve Body Padding Yönetimi
    const handleScroll = () => {
        if (!header) return; // Header yoksa devam etme

        if (window.scrollY > 50) {
            if (!header.classList.contains('sticky')) {
                header.classList.add('sticky');
                // Yapýþkan menü aktifken, içeriðin menünün altýnda kaybolmamasý için body'ye boþluk ekler.
                document.body.style.paddingTop = `${header.offsetHeight}px`;
            }
        } else {
            header.classList.remove('sticky');
            document.body.style.paddingTop = '0';
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Sayfa yüklendiðinde bir kez çalýþtýr ki menü hemen kontrol edilsin
    handleScroll();


    // Akýcý Kaydýrma (Smooth Scroll) ve Header Offset Desteði
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Header yapýþkan durumdaysa yüksekliðini hesapla, deðilse 0
                const offset = header.classList.contains('sticky') ? header.offsetHeight : 0;

                // Hedef konuma, menü yüksekliði kadar yukarý kaydýr
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Yýldýz Elektrik scriptleri (Tek giriþlik splash ve akýllý kaydýrma) aktif.');
});