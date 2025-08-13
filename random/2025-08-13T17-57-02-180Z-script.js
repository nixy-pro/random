(function() {
    function initNixyBilingualWidget() {
        const widget = document.querySelector('#download-widget-nixy');
        if (!widget) return;

        // Efek Ripple
        const actionButtons = widget.querySelectorAll('.nixy-action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                ripple.className = 'nixy-ripple';
                
                if (!this.classList.contains('nixy-btn-tutorial1') && !this.classList.contains('nixy-btn-donasi')) {
                    this.appendChild(ripple);
                } else if (this.href && this.href.slice(-1) !== '#') {
                     this.appendChild(ripple);
                }

                ripple.addEventListener('animationend', () => { ripple.remove(); });
            });
        });

        // Pengalih Bahasa
        const tabButtons = widget.querySelectorAll('.nixy-tab-btn');
        const glider = widget.querySelector('.nixy-glider');
        function setLanguage(lang, initialLoad = false) {
            const activeTab = widget.querySelector(`.nixy-tab-btn[data-lang="${lang}"]`);
            if (!activeTab) return;
            const gliderOffset = activeTab.offsetLeft - (glider.parentElement.clientLeft + 4);
            glider.style.transform = `translateX(${gliderOffset}px)`;
            if(initialLoad) {
               glider.style.transition = 'none';
               setTimeout(()=> { glider.style.transition = 'transform 0.3s cubic-bezier(0.45, 0.05, 0.55, 0.95)'; }, 50);
            }
            tabButtons.forEach(btn => btn.classList.remove('active'));
            activeTab.classList.add('active');
            if (lang === 'en') { 
                widget.classList.add('show-en'); 
            } else { 
                widget.classList.remove('show-en'); 
            }
            try { 
                localStorage.setItem('nixy-widget-lang', lang); 
            } catch (e) { 
                console.log("Language preference failed to save."); 
            }
        }
        tabButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
        
        setLanguage('id', true);

        // Fungsionalitas Pop-up Video
        const tutorialBtn = widget.querySelector('.nixy-btn-tutorial1');
        const videoPopup = widget.querySelector('.nixy-videoPopup');
        const video = widget.querySelector('.nixy-popupVideo');
        const closeVideoBtn = widget.querySelector('.nixy-close-icon');
        const videoSrc = "https://nixymine.pages.dev/random/2025-08-06T21-08-51-771Z-tutorial.mp4";
        
        function openVideoPopup(e) { 
            e.preventDefault(); 
            videoPopup.classList.add('active'); 
            video.src = videoSrc; 
            video.load(); 
            video.play(); 
        }
        function closeVideoPopup() { 
            videoPopup.classList.remove('active'); 
            video.pause(); 
            video.src = ''; 
        }
        
        tutorialBtn.addEventListener('click', openVideoPopup);
        closeVideoBtn.addEventListener('click', closeVideoPopup);

        // Fungsionalitas Pop-up Donasi
        const donationBtn = widget.querySelector('.nixy-btn-donasi');
        const donationPopup = widget.querySelector('.nixy-donationPopup');
        const closeDonationBtn = widget.querySelector('.nixy-close-donation-icon');
        const copyBtn = widget.querySelector('#nixy-copy-btn');
        const donationInput = widget.querySelector('#nixy-donation-input');
        const copyFeedback = widget.querySelector('#nixy-copy-feedback');

        function openDonationPopup(e) {
            e.preventDefault();
            donationPopup.classList.add('active');
        }

        function closeDonationPopup() {
            donationPopup.classList.remove('active');
            copyFeedback.style.display = 'none';
        }

        function copyAddress() {
            navigator.clipboard.writeText(donationInput.value).then(() => {
                copyFeedback.style.display = 'block';
                setTimeout(() => {
                    copyFeedback.style.display = 'none';
                }, 2000);
            }).catch(err => {
                console.error('Gagal menyalin alamat: ', err);
            });
        }

        donationBtn.addEventListener('click', openDonationPopup);
        closeDonationBtn.addEventListener('click', closeDonationPopup);
        copyBtn.addEventListener('click', copyAddress);
    }

    if (document.readyState === 'complete') {
        initNixyBilingualWidget();
    } else {
        window.addEventListener('load', initNixyBilingualWidget);
    }
})();