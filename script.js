// script.js
const videosDB = [
    {
        id: 'vid1',
        title: 'How to build a YouTube clone with HTML & CSS - Premium Edition',
        channelName: 'Simplified by SAMI',
        subscribers: '1.2M subscribers',
        views: '1.2M views',
        uploadTime: '2 days ago',
        duration: '10:30',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
        channelAvatar: 'https://ui-avatars.com/api/?name=SM&background=e74c3c&color=fff',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'Learn how to build a premium YouTube clone from scratch using vanilla HTML, CSS, and JavaScript. No frameworks needed! This complete tutorial covers CSS Grid, Flexbox, custom variables, and sleek animations.'
    },
    {
        id: 'vid2',
        title: 'Learn Modern CSS & Flexbox in 5 minutes',
        channelName: 'CSS Masters',
        subscribers: '500K subscribers',
        views: '850K views',
        uploadTime: '1 week ago',
        duration: '05:45',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
        channelAvatar: 'https://ui-avatars.com/api/?name=CS&background=2ecc71&color=fff',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'CSS Flexbox is powerful! Let me show you how to master it in just 5 minutes with practical examples and modern layouts.'
    },
    {
        id: 'vid3',
        title: 'Building a Stunning Web App from Scratch',
        channelName: 'Frontend Fun',
        subscribers: '890K subscribers',
        views: '2.1M views',
        uploadTime: '3 weeks ago',
        duration: '15:22',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
        channelAvatar: 'https://ui-avatars.com/api/?name=FE&background=3498db&color=fff',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'In this video, we build an amazing frontend layout focusing on glassmorphism and modern UI trends.'
    },
    {
        id: 'vid4',
        title: 'Designing the Perfect Dark Mode Interface',
        channelName: 'Design Systems',
        subscribers: '200K subscribers',
        views: '500K views',
        uploadTime: '1 month ago',
        duration: '08:14',
        thumbnail: 'https://images.unsplash.com/photo-1618477388954-71811e512c14?auto=format&fit=crop&w=600&q=80',
        channelAvatar: 'https://ui-avatars.com/api/?name=DS&background=f1c40f&color=fff',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'Dark mode is essential for modern apps. Learn design principles for background contrasting and text legibility.'
    },
    {
        id: 'vid5',
        title: 'Integrating AI Tools into Your Workflow',
        channelName: 'Tech Trends',
        subscribers: '3M subscribers',
        views: '3.4M views',
        uploadTime: '4 months ago',
        duration: '12:05',
        thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=600&q=80',
        channelAvatar: 'https://ui-avatars.com/api/?name=AI&background=9b59b6&color=fff',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'Boost your productivity 10x by integrating AI coding tools into your day to day development workflow.'
    },
    {
        id: 'vid6',
        title: 'Advanced JavaScript: Deep Dive into Async/Await',
        channelName: 'Code Explained',
        subscribers: '150K subscribers',
        views: '112K views',
        uploadTime: '2 hours ago',
        duration: '21:30',
        thumbnail: 'https://images.unsplash.com/photo-1522252234503-e356532ceff5?auto=format&fit=crop&w=600&q=80',
        channelAvatar: 'https://ui-avatars.com/api/?name=JS&background=34495e&color=fff',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'Stop struggling with callbacks and promises. We deep dive into custom async patterns in modern JavaScript.'
    }
];

const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

document.addEventListener('DOMContentLoaded', function() {
    // Page Enter Transition Overview
    document.body.classList.add('page-enter-active');
    setTimeout(() => document.body.classList.remove('page-enter-active'), 50);

    interceptLinksForTransitions();
    initGlobalUI();

    const path = window.location.pathname;
    if (path.includes('watch.html')) {
        initWatchPage();
    } else {
        initHomePage();
    }
});

function navigateWithTransition(url) {
    document.body.classList.add('page-exit-active');
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

function interceptLinksForTransitions() {
    document.querySelectorAll('a').forEach(link => {
        if (link.hostname === window.location.hostname && !link.target) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // If it's the MyTube logo button, do a smooth soft-refresh simulation if already on home
                const isLogo = this.closest('.logo-container') || this.classList.contains('logo-container');
                const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
                
                if (isLogo && isHome) {
                    document.body.classList.add('page-exit-active');
                    setTimeout(() => window.location.reload(), 300);
                } else {
                    navigateWithTransition(this.href);
                }
            });
        }
    });
}

function initGlobalUI() {
    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const voiceSearchBtn = document.getElementById('voiceSearchBtn');

    function performSearch() {
        const searchTerm = searchInput?.value.trim();
        if (searchTerm && searchBtn) {
            searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            setTimeout(() => {
                searchBtn.innerHTML = '<i class="fas fa-search"></i>';
                console.log(`Searching MyTube for: ${searchTerm}`);
            }, 600);
        }
    }

    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });
    }

    if (voiceSearchBtn) {
        voiceSearchBtn.addEventListener('click', function() {
            this.style.color = '#e74c3c';
            setTimeout(() => { this.style.color = ''; }, 500);
        });
    }

    // Sidebar Toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Ensure Ripple Style
    if (!document.getElementById('myTubeRippleStyle')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'myTubeRippleStyle';
        rippleStyle.innerHTML = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 600ms linear;
                background-color: rgba(255, 255, 255, 0.25);
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to { transform: scale(4); opacity: 0; }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
}

function attachRipples() {
    document.querySelectorAll('.nav-icon, .menu-btn, .sidebar-item, .action-btn, .bottom-nav-item').forEach(btn => {
        btn.style.position = btn.style.position === 'static' || !btn.style.position ? 'relative' : btn.style.position;
        btn.style.overflow = 'hidden';
        btn.removeEventListener('click', createRipple);
        btn.addEventListener('click', createRipple);
    });
}

function createRipple(event) {
    const element = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - element.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - element.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const oldRipple = element.querySelector('.ripple');
    if (oldRipple) oldRipple.remove();

    element.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
}

// --- ANIMATION FRAMEWORKS ---

function applyScrollAnimations(elements) {
    const observerOptions = {
        root: null,
        rootMargin: '50px 0px', 
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach((el, index) => {
        el.classList.add('scroll-hidden');
        el.style.transitionDelay = `${(index % 12) * 50}ms`; 
        observer.observe(el);
    });
}

function apply3DTilt(elements) {
    if (isTouchDevice) return; // Restrict advanced interaction layer from unoptimized devices

    elements.forEach(el => {
        el.addEventListener('mousemove', handleTilt);
        el.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const el = e.currentTarget;
    requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Tilt math calculation
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
    });
}

function resetTilt(e) {
    const el = e.currentTarget;
    requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        el.style.setProperty('--mouse-x', `50%`);
        el.style.setProperty('--mouse-y', `50%`);
    });
}

// --- HOME PAGE LOGIC ---
function initHomePage() {
    const videoGrid = document.getElementById('videoGrid');
    if (!videoGrid) return;

    renderHomeVideos(videosDB, videoGrid);

    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const sectionTitle = document.getElementById('sectionTitle');

    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.sidebar-item.active')?.classList.remove('active');
            this.classList.add('active');

            if (sectionTitle && videoGrid) {
                const spanElement = this.querySelector('span');
                if (spanElement) sectionTitle.innerText = spanElement.innerText;
                
                videoGrid.style.opacity = '0';
                videoGrid.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    const shuffled = [...videosDB].sort(() => Math.random() - 0.5);
                    renderHomeVideos(shuffled, videoGrid);
                    videoGrid.style.transition = 'all 0.3s ease-out';
                    videoGrid.style.opacity = '1';
                    videoGrid.style.transform = 'translateY(0)';
                }, 300);
            }
        });
    });

    attachRipples();
}

function renderHomeVideos(videos, container) {
    container.innerHTML = '';
    const cards = [];
    videos.forEach(video => {
        const article = document.createElement('article');
        article.className = 'video-card tilt-target-3d';        
        article.innerHTML = `
            <div class="glare-layer"></div>
            <div class="thumbnail">
                <img src="${video.thumbnail}" alt="Thumbnail">
                <div class="duration">${video.duration}</div>
            </div>
            <div class="video-info">
                <img src="${video.channelAvatar}" class="channel-icon" alt="Channel avatar">
                <div class="video-details">
                    <h3 title="${video.title}">${video.title}</h3>
                    <p class="channel-name">${video.channelName}</p>
                    <p class="video-meta">${video.views} • ${video.uploadTime}</p>
                </div>
            </div>
        `;
        article.addEventListener('click', () => {
            navigateWithTransition(`watch.html?id=${video.id}`);
        });
        container.appendChild(article);
        cards.push(article);
    });

    // Animate mounting cards
    applyScrollAnimations(cards);
    apply3DTilt(cards);
}

// --- WATCH PAGE LOGIC ---
function initWatchPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id') || 'vid1';

    loadVideoData(videoId);

    // Description toggle
    const descBox = document.getElementById('watchDescriptionBox');
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (descBox && showMoreBtn) {
        descBox.addEventListener('click', function() {
            this.classList.toggle('expanded');
            showMoreBtn.innerText = this.classList.contains('expanded') ? 'Show less' : 'Show more';
        });
    }

    // Like Button
    const likeBtn = document.getElementById('likeBtn');
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            this.classList.toggle('liked');
            if (this.classList.contains('liked')) {
                this.style.color = '#3ea6ff';
                this.style.textShadow = '0 0 12px rgba(62, 166, 255, 0.5)';
                this.querySelector('i').classList.replace('far', 'fas');
            } else {
                this.style.color = '';
                this.style.textShadow = '';
                this.querySelector('i').classList.replace('fas', 'far');
            }
        });
    }

    attachRipples();
}

function loadVideoData(id) {
    const video = videosDB.find(v => v.id === id) || videosDB[0];
    
    // Ambient Smooth transition over content text for reload
    const primaryContent = document.querySelector('.primary-content');
    primaryContent.style.opacity = '0';

    setTimeout(() => {
        document.getElementById('videoSource').src = video.videoUrl;
        document.getElementById('mainVideoPlayer').load(); 
        document.getElementById('watchTitle').innerText = video.title;
        document.getElementById('watchChannelName').innerText = video.channelName;
        document.getElementById('watchChannelAvatar').src = video.channelAvatar;
        document.querySelector('.watch-subscribers').innerText = video.subscribers;
        document.getElementById('watchViews').innerText = video.views;
        document.getElementById('watchUploadTime').innerText = video.uploadTime;
        document.getElementById('watchDescription').innerText = video.description;

        const likeBtn = document.getElementById('likeBtn');
        if (likeBtn) {
            likeBtn.classList.remove('liked');
            likeBtn.style.color = '';
            likeBtn.style.textShadow = '';
            likeBtn.querySelector('i').classList.replace('fas', 'far');
        }

        primaryContent.style.transition = 'opacity 0.4s ease';
        primaryContent.style.opacity = '1';
    }, 200);

    const recommendedList = document.getElementById('recommendedList');
    recommendedList.innerHTML = '';
    
    const recommendations = videosDB.filter(v => v.id !== video.id);
    const recCards = [];
    
    recommendations.forEach(rec => {
        const div = document.createElement('div');
        div.className = 'recommended-card tilt-target-3d';
        div.innerHTML = `
            <div class="glare-layer"></div>
            <div class="thumbnail">
                <img src="${rec.thumbnail}" alt="Thumbnail">
                <div class="duration">${rec.duration}</div>
            </div>
            <div class="recommended-info">
                <h3 title="${rec.title}">${rec.title}</h3>
                <p class="channel-name">${rec.channelName}</p>
                <p class="video-meta">${rec.views} • ${rec.uploadTime}</p>
            </div>
        `;
        div.addEventListener('click', () => {
            window.history.pushState({}, '', `watch.html?id=${rec.id}`);
            loadVideoData(rec.id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        recommendedList.appendChild(div);
        recCards.push(div);
    });
    
    applyScrollAnimations(recCards);
    apply3DTilt(recCards);
    attachRipples();
}