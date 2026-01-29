// Claude Code Workshop - Tab Navigation

document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    handleHashNavigation();
    initKeyboardNavigation();
});

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update active states
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
                // Scroll to top of content when switching tabs
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Update URL hash
            history.pushState(null, '', `#${targetTab}`);
        });
    });
}

function handleHashNavigation() {
    // Check for hash in URL on load
    const hash = window.location.hash.slice(1);
    if (hash) {
        const targetBtn = document.querySelector(`[data-tab="${hash}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    }

    // Handle browser back/forward
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        const targetBtn = document.querySelector(`[data-tab="${hash}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    });
}

function initKeyboardNavigation() {
    // Keyboard navigation with arrow keys
    document.addEventListener('keydown', (e) => {
        // Only handle arrow keys when not in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        const tabBtns = Array.from(document.querySelectorAll('.tab-btn'));
        const activeBtn = document.querySelector('.tab-btn.active');
        const currentIndex = tabBtns.indexOf(activeBtn);

        if (e.key === 'ArrowRight' && currentIndex < tabBtns.length - 1) {
            tabBtns[currentIndex + 1].click();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            tabBtns[currentIndex - 1].click();
        }
    });
}

// Add smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
