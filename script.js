// ==========================================
// 1. ANIME DATABASE (For Title Matching in Funnel)
// ==========================================
// Yahan apne sabhi anime ki ID aur unka Asli Title likhna hai
const videoDB = [
    { id: 'jujutsu_kaisen', title: 'Jujutsu Kaisen Season 1' },
    { id: 'ninja', title: 'Ninja Kamui' },
    { id: 'naruto_shippuden', title: 'Naruto Shippuden' },
    { id: 'demon_slayer', title: 'Demon Slayer' },
    { id: 'ninja2', title: 'Ninja 2'}
];

// ==========================================
// 2. ANIMATION LOGIC (Card Show on Scroll)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.movie-card');
    
    // Intersection Observer (check that card is shown in screen or not)
    const observer = new IntersectionObserver((entries) => {
        let delay = 0;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // single card (150ms gap) load karne ka logic
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, delay);
                delay += 150; // next card ke liye 150ms extra
                observer.unobserve(entry.target); // single time load 
            }
        });
    }, { threshold: 0.1 }); // card load when 10% is shown 

    //  (Observer) for all cards
    cards.forEach(card => observer.observe(card));
});

// ==========================================
// 3. SEARCH BAR LOGIC (On Enter Press)
// ==========================================
const searchInput = document.getElementById('searchInput');
const noResultMsg = document.getElementById('noResultMsg');

if (searchInput) {
    // 'keyup' ki jagah 'keydown' lagaya hai aur Enter key check kar rahe hain
    searchInput.addEventListener('keydown', function(event) {
        
        // Jab user 'Enter' dabayega tabhi code chalega
        if (event.key === 'Enter') {
            event.preventDefault(); // Default behavior roko
            
            const filter = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll('.movie-card');
            let matchCount = 0; // Ginenge kitne card match hue
            
            cards.forEach(card => {
                const title = card.querySelector('.movie-title').innerText.toLowerCase();
                if (title.includes(filter)) {
                    card.style.display = ""; // Match hua to dikhao
                    matchCount++; // Count badhao
                } else {
                    card.style.display = "none"; // Match nahi hua to chupao
                }
            });

            // Agar ek bhi card match nahi hua to "No result Found!" dikhao
            if (noResultMsg) {
                if (matchCount === 0) {
                    noResultMsg.style.display = "block";
                } else {
                    noResultMsg.style.display = "none";
                }
            }
        }
    });
}