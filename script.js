document.addEventListener('DOMContentLoaded', () => {

    // Temel Elementler
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const header = document.querySelector('header');

    // Splash Screen (A��l�� Ekran�) Y�netimi
    // Sadece index.html'de ve oturumun ilk giri�inde g�ster
    if (splashScreen) {

        const isFirstVisit = !sessionStorage.getItem('yildizElektrikVisited');
        const delay = 2000; // Splash bekleme s�resi (2 saniye)

        if (isFirstVisit) {
            // �lk ziyaretse splash'i g�ster ve zamanlay�c�y� ba�lat

            // Ana i�eri�i ilk ba�ta g�r�nmez yap
            if (mainContent) mainContent.style.opacity = '0';

            setTimeout(() => {
                splashScreen.style.opacity = '0'; // Yumu�ak solma ba�lat

                // Opakl�k ge�i�i bittikten sonra g�r�n�rl��� ayarla
                splashScreen.addEventListener('transitionend', () => {
                    splashScreen.style.display = 'none';
                });

                // Ana i�eri�i g�ster
                if (mainContent) mainContent.style.opacity = '1';

                // Ziyaret edildi i�aretini koy (Oturum boyunca bir daha ��kmaz)
                sessionStorage.setItem('yildizElektrikVisited', 'true');

            }, delay);

        } else {
            // �LK Z�YARET DE��LSE: Splash'i hemen gizle ve i�eri�i g�ster
            splashScreen.style.display = 'none';
            if (mainContent) mainContent.style.opacity = '1';
        }
    }


    // Yap��kan Header ve Body Padding Y�netimi
    const handleScroll = () => {
        if (!header) return; // Header yoksa devam etme

        if (window.scrollY > 50) {
            if (!header.classList.contains('sticky')) {
                header.classList.add('sticky');
                // Yap��kan men� aktifken, i�eri�in men�n�n alt�nda kaybolmamas� i�in body'ye bo�luk ekler.
                document.body.style.paddingTop = `${header.offsetHeight}px`;
            }
        } else {
            header.classList.remove('sticky');
            document.body.style.paddingTop = '0';
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Sayfa y�klendi�inde bir kez �al��t�r ki men� hemen kontrol edilsin
    handleScroll();


    // Ak�c� Kayd�rma (Smooth Scroll) ve Header Offset Deste�i
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Header yap��kan durumdaysa y�ksekli�ini hesapla, de�ilse 0
                const offset = header.classList.contains('sticky') ? header.offsetHeight : 0;

                // Hedef konuma, men� y�ksekli�i kadar yukar� kayd�r
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Y�ld�z Elektrik scriptleri (Tek giri�lik splash ve ak�ll� kayd�rma) aktif.');
});