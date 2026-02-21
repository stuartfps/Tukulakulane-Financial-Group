// ============================================
// Tukulakulane Group – JavaScript (final version)
// Features: tabs, accordion FAQ, live countdown
// ============================================

(function() {
    // ---------- TAB SWITCHING ----------
    const faqTab = document.getElementById('faqTab');
    const leadersTab = document.getElementById('leadersTab');
    const cycleTab = document.getElementById('cycleTab');
    const faqPanel = document.getElementById('faqPanel');
    const leadersPanel = document.getElementById('leadersPanel');
    const cyclePanel = document.getElementById('cyclePanel');

    // Remove active class from all tabs and panels
    function deactivateAll() {
        [faqTab, leadersTab, cycleTab].forEach(t => t.classList.remove('active'));
        [faqPanel, leadersPanel, cyclePanel].forEach(p => p.classList.remove('active-panel'));
    }

    // Event listeners for each tab
    faqTab.addEventListener('click', () => {
        deactivateAll();
        faqTab.classList.add('active');
        faqPanel.classList.add('active-panel');
    });

    leadersTab.addEventListener('click', () => {
        deactivateAll();
        leadersTab.classList.add('active');
        leadersPanel.classList.add('active-panel');
    });

    cycleTab.addEventListener('click', () => {
        deactivateAll();
        cycleTab.classList.add('active');
        cyclePanel.classList.add('active-panel');
    });

    // ---------- FAQ ACCORDION (dot bullets) ----------
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(q => {
        q.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-target'); // e.g., "ans1"
            const answer = document.getElementById(targetId);
            if (!answer) return;

            const iconSpan = this.querySelector('.icon');

            // Toggle answer visibility
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                iconSpan.innerText = '•';          // collapsed dot
            } else {
                answer.style.display = 'block';
                iconSpan.innerText = '◉';          // expanded dot (filled)
            }
        });
    });

    // ---------- COUNTDOWN TO DECEMBER 20 (23:59:59) ----------
    function updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        // Target: Dec 20 of current year, end of day
        let target = new Date(currentYear, 11, 20, 23, 59, 59); // month 11 = December

        // If we've passed Dec 20, target becomes next year
        if (now > target) {
            target = new Date(currentYear + 1, 11, 20, 23, 59, 59);
        }

        const diff = target - now; // milliseconds

        if (diff <= 0) {
            document.getElementById('days-remaining').innerText = '0';
            document.getElementById('countdown-timer').innerText = 'CYCLE ENDED';
            return;
        }

        // Calculate days, hours, minutes, seconds
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        // Update the large days display
        document.getElementById('days-remaining').innerText = days;

        // Update the full countdown string
        document.getElementById('countdown-timer').innerText =
            `${days}d ${hours.toString().padStart(2,'0')}h ` +
            `${minutes.toString().padStart(2,'0')}m ${seconds.toString().padStart(2,'0')}s`;
    }

    // Initial call and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
})();