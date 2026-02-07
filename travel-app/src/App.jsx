import React, { useEffect, useState, useRef } from 'react';
import { Mountain, Waves, Utensils, Landmark, Sun, Plane, CheckCircle, Camera, MessageCircle, Users, Video } from 'lucide-react';
import './index.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState('');
  const [expImageIndex, setExpImageIndex] = useState(0);

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const [subscribed, setSubscribed] = useState(false);

  const handleOpenBooking = (itemTitle = '') => {
    setBookingPrefill(itemTitle);
    setBookingSuccess(false);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    const formData = new FormData(e.target);
    const bookingDetails = {
      name: formData.get('name'),
      email: formData.get('email'),
      interest: formData.get('interest'),
      date: formData.get('date'),
      travelers: formData.get('travelers'),
      requirements: formData.get('requirements'),
    };

    try {
      const response = await fetch('http://localhost:5000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        setBookingSuccess(true);
        setTimeout(() => setShowBookingModal(false), 3000);
      } else {
        alert('Failed to send booking request. Please try again later.');
      }
    } catch (error) {
      console.error('Booking Error:', error);
      alert('Network error. Please make sure the backend server and email credentials are set up.');
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setExpImageIndex(prev => prev + 1), 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const destinations = [
    { id: 1, image: '/images/sigiriya1.jpg', title: 'Sigiriya Rock Fortress', tag: 'Heritage', rating: '4.9', price: 'From $299' },
    { id: 2, image: '/images/demodara-nine-arch-bridge-ella-sri-lanka-scaled-1_77c0b1eb-4170-472a-b6df-950903726734.jpg', title: 'Nine Arch Bridge, Ella', tag: 'Scenic', rating: '4.8', price: 'From $199' },
    { id: 3, image: '/images/galle-fort-1050x700-1.jpg', title: 'Galle Fort', tag: 'Coastal', rating: '4.9', price: 'From $249' },
    { id: 4, image: '/images/Things-to-do-in-Ella.jpg', title: 'Ella, Sri Lanka', tag: 'Adventure', rating: '4.7', price: 'From $179' },
    { id: 5, image: '/images/The+Common+Wanderer-9888.webp', title: 'Demodara Bridge', tag: 'Nature', rating: '4.8', price: 'From $199' },
    { id: 6, image: '/images/gallery_Galle_Dutch_Fort.jpg', title: 'Galle Dutch Fort', tag: 'Heritage', rating: '5.0', price: 'From $249' },
  ];

  const experiences = [
    {
      icon: <Mountain size={38} color="var(--accent)" strokeWidth={1.5} />,
      title: 'Mountain Trekking',
      desc: 'Scale breathtaking peaks with expert alpine guides. From sunrise hikes to multi-day expeditions across the worlds most stunning ranges.',
      color: '#e8f5e9',
      image: '/Experiences/Mountain Trekking/slider1.jpg',
      images: [
        '/Experiences/Mountain Trekking/DSC5219.jpg',
        '/Experiences/Mountain Trekking/Ella-Rock-Climb-slider-1.jpg',
        '/Experiences/Mountain Trekking/Ella-Rock-Climb-slider-4.jpg',
        '/Experiences/Mountain Trekking/Ella-Rock-how-to-hike-it-yourself-17.jpg',
        '/Experiences/Mountain Trekking/slider1.jpg'
      ]
    },
    {
      icon: <Waves size={38} color="var(--accent)" strokeWidth={1.5} />,
      title: 'Deep Sea Diving',
      desc: 'Explore vibrant coral reefs and underwater caves. Discover marine life in crystal-clear waters with certified dive instructors.',
      color: '#e3f2fd',
      image: '/Experiences/Deep Sea Diving/sri-lanka-diving-travel.jpg',
      images: [
        '/Experiences/Deep Sea Diving/38.jpg',
        '/Experiences/Deep Sea Diving/LK94009477-01-E.webp',
        '/Experiences/Deep Sea Diving/Lakshadweep_20190708111445.jpg',
        '/Experiences/Deep Sea Diving/batticaloa-diving-sri-lanka.jpg',
        '/Experiences/Deep Sea Diving/sri-lanka-diving-travel.jpg'
      ]
    },
    {
      icon: <Utensils size={38} color="var(--accent)" strokeWidth={1.5} />,
      title: 'Culinary Tours',
      desc: 'Savor authentic flavors from street food to fine dining. Learn centuries-old recipes from local master chefs.',
      color: '#fff3e0',
      image: '/Experiences/Culinary Tours/01.jpg',
      images: [
        '/Experiences/Culinary Tours/01.jpg',
        '/Experiences/Culinary Tours/02.jpg',
        '/Experiences/Culinary Tours/LK94007896-01-E.JPG',
        '/Experiences/Culinary Tours/Sri Lanka Culinary Tour (31).jpg',
        '/Experiences/Culinary Tours/images.jpg'
      ]
    },
    {
      icon: <Landmark size={38} color="var(--accent)" strokeWidth={1.5} />,
      title: 'Cultural Heritage',
      desc: 'Walk through ancient temples, historic cities, and UNESCO World Heritage sites with passionate historians.',
      color: '#fce4ec',
      image: '/Experiences/Cultural Heritage/Temple-of-the-Sacred-Tooth-Relic-Kandy-Sri-Lanka-940x585-c-default.jpg',
      images: [
        '/Experiences/Cultural Heritage/A-statue-of-reclining-Buddha-Dambulla-5.jpg',
        '/Experiences/Cultural Heritage/Temple-of-the-Sacred-Tooth-Relic-Kandy-Sri-Lanka-940x585-c-default.jpg',
        '/Experiences/Cultural Heritage/UNESCO-World-Heritage-Site-Brahmanic-Monuments-Polonnaruwa-Sri-Lanka-940x585-c-default.jpg',
        '/Experiences/Cultural Heritage/images.jpg',
        '/Experiences/Cultural Heritage/statue-of-buddha-sri-lanka.jpg'
      ]
    },
    {
      icon: <Sun size={38} color="var(--accent)" strokeWidth={1.5} />,
      title: 'Wellness Retreats',
      desc: 'Rejuvenate your mind and body with yoga sessions, meditation, and spa experiences in paradisiacal settings.',
      color: '#f3e5f5',
      image: '/Experiences/Wellness Retreats/health-retreats-sri-lanka.jpg',
      images: [
        '/Experiences/Wellness Retreats/DSC_3561rt-e1491904924715.jpg',
        '/Experiences/Wellness Retreats/d-santani-pavillion.jpg',
        '/Experiences/Wellness Retreats/health-retreats-sri-lanka.jpg',
        '/Experiences/Wellness Retreats/sen-wellness-sanctuary.webp',
        '/Experiences/Wellness Retreats/top-10-sri-lanka-wellness-retreats-slider-3.jpg'
      ]
    },
    {
      icon: <Plane size={38} color="var(--accent)" strokeWidth={1.5} />,
      title: 'Sky Adventures',
      desc: 'Hot air balloon rides, paragliding, and skydiving experiences that let you see the world from above.',
      color: '#e0f7fa',
      image: '/Experiences/Sky Adventures/para1.jpg',
      images: [
        '/Experiences/Sky Adventures/G0018835-1_drougless-scaled.webp',
        '/Experiences/Sky Adventures/flying-rawana-header-image-970×600.jpg',
        '/Experiences/Sky Adventures/para1.jpg',
        '/Experiences/Sky Adventures/sd1.jpg',
        '/Experiences/Sky Adventures/sky6-min.jpg'
      ]
    },
  ];

  const journalEntries = [
    {
      image: '/images/sigiriya1.jpg',
      date: 'March 15, 2026',
      category: 'Heritage',
      title: 'Climbing Sigiriya: The Ancient Rock Fortress of Sri Lanka',
      excerpt: 'Rising 200 meters above the surrounding plains, Sigiriya offers breathtaking views and a glimpse into an ancient kingdom...',
    },
    {
      image: '/images/featured-img2.jpg',
      date: 'February 28, 2026',
      category: 'Coastal',
      title: 'Exploring Galle Fort: A Colonial Gem by the Sea',
      excerpt: 'Walk through cobblestone streets lined with Dutch colonial architecture, boutique shops, and ocean views...',
    },
    {
      image: '/images/Things-to-do-in-Ella.jpg',
      date: 'February 10, 2026',
      category: 'Adventure',
      title: 'Ella: The Hill Country Paradise You Need to Visit',
      excerpt: 'From the iconic Nine Arch Bridge to Little Adam\'s Peak, Ella is a haven for nature lovers and thrill seekers...',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      location: 'New York, USA',
      text: 'WANDER transformed our honeymoon into an absolute dream. Every detail was impeccably planned — from the private sunset cruise to the candlelit dinner on the beach.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'James Chen',
      location: 'London, UK',
      text: `I've traveled with many luxury agencies, but WANDER is in a league of its own. The attention to detail and local knowledge of their guides made all the difference.`,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Aiko Tanaka',
      location: 'Tokyo, Japan',
      text: 'The cultural heritage tour was phenomenal. Our guide shared stories and took us to places we never would have found on our own. Truly life-changing.',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
  ];

  const stats = [
    { number: '150+', label: 'Destinations' },
    { number: '50K+', label: 'Happy Travelers' },
    { number: '200+', label: 'Expert Guides' },
    { number: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <>
      {/* Navigation */}
      <nav className="navbar" style={scrolled ? { background: 'rgba(10, 10, 10, 0.95)', padding: '1rem 4rem' } : {}}>
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <h2>WANDER.</h2>
        </div>
        <ul className="nav-links">
          <li onClick={() => scrollToSection('destinations')}>Destinations</li>
          <li onClick={() => scrollToSection('experiences')}>Experiences</li>
          <li onClick={() => scrollToSection('journal')}>Journal</li>
          <li onClick={() => scrollToSection('about')}>About</li>
        </ul>
        <button className="nav-btn" onClick={() => handleOpenBooking()}>Book Now</button>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero" id="hero">
          <img src="/images/Things-to-do-in-Ella.jpg" alt="Hero Background" className="hero-bg" />
          <div className="hero-content">
            <h1 className="hero-title">Discover the Extraordinary</h1>
            <p className="hero-subtitle">
              Embark on unforgettable journeys curated for the modern explorer.
              Find your next adventure with our luxury travel experiences.
            </p>
            <button className="hero-cta" onClick={() => scrollToSection('destinations')}>Explore Destinations</button>
          </div>
          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <div className="scroll-arrow"></div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className={`stats-banner ${visibleSections.has('stats') ? 'visible' : ''}`} id="stats">
          {stats.map((stat, i) => (
            <div className="stat-item" key={i}>
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Destinations Section */}
        <section className={`destinations-section ${visibleSections.has('destinations') ? 'visible' : ''}`} id="destinations">
          <div className="section-header">
            <span className="section-tag">WHERE TO GO</span>
            <h2 className="section-title">Popular Destinations</h2>
            <p className="section-subtitle">
              Handpicked locations offering the perfect blend of adventure, culture, and relaxation.
            </p>
          </div>

          <div className="destinations-grid">
            {destinations.map((dest, i) => (
              <div className="destination-card" key={dest.id} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="destination-img-wrapper">
                  <img src={dest.image} alt={dest.title} className="destination-img" />
                  <span className="destination-tag">{dest.tag}</span>
                  <div className="destination-rating">★ {dest.rating}</div>
                </div>
                <div className="destination-info">
                  <h3>{dest.title}</h3>
                  <div className="destination-meta">
                    <span className="destination-price">{dest.price}</span>
                    <button className="destination-btn" onClick={() => setSelectedDestination(dest)}>View Details →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experiences Section */}
        <section className={`experiences-section ${visibleSections.has('experiences') ? 'visible' : ''}`} id="experiences">
          <div className="section-header">
            <span className="section-tag">WHAT WE OFFER</span>
            <h2 className="section-title">Curated Experiences</h2>
            <p className="section-subtitle">
              From adrenaline-filled adventures to soul-soothing retreats — every experience is unforgettable.
            </p>
          </div>

          <div className="experiences-grid">
            {experiences.map((exp, i) => (
              <div className="experience-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="experience-img-wrapper">
                  {exp.images?.map((imgUrl, imgIndex) => (
                    <img 
                      key={imgIndex} 
                      src={imgUrl} 
                      alt={`${exp.title} ${imgIndex}`} 
                      className={`experience-img ${imgIndex === (expImageIndex % exp.images.length) ? 'active' : ''}`} 
                    />
                  ))}
                </div>
                <h3>{exp.title}</h3>
                <p>{exp.desc}</p>
                <a className="experience-link" href="#" onClick={(e) => { e.preventDefault(); setSelectedExperience(exp); }}>Learn More →</a>
              </div>
            ))}
          </div>
        </section>

        {/* Features / Why Choose Us */}
        <section className={`features ${visibleSections.has('why-us') ? 'visible' : ''}`} id="why-us">
          <div className="features-inner">
            <div className="features-text">
              <span className="section-tag">WHY WANDER</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Why Travelers Choose Us</h2>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.7, marginBottom: '2rem' }}>
                We don't just plan trips — we craft stories. Every detail is thoughtfully designed so you can focus on making memories.
              </p>
            </div>
            <div className="features-cards">
              <div className="feature-box">
                <div className="feature-number">01</div>
                <h3>Curated Experiences</h3>
                <p>Every journey is meticulously planned to offer you unique and unforgettable moments.</p>
              </div>
              <div className="feature-box">
                <div className="feature-number">02</div>
                <h3>Luxury Stays</h3>
                <p>Relax in handpicked premium accommodations that redefine comfort and elegance.</p>
              </div>
              <div className="feature-box">
                <div className="feature-number">03</div>
                <h3>Expert Guides</h3>
                <p>Travel with seasoned locals who share their deep knowledge and passion.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className={`gallery-section ${visibleSections.has('gallery') ? 'visible' : ''}`} id="gallery">
          <div className="section-header">
            <span className="section-tag">INSPIRATION</span>
            <h2 className="section-title">Trending Destinations</h2>
            <p className="section-subtitle">
              Get inspired by our gallery of stunning locations around the globe.
            </p>
          </div>

          <div className="gallery-grid">
            {[
              { id: 't1', image: '/trend-des/kandy-1024x551.jpg', title: 'Kandy', tag: 'Culture' },
              { id: 't2', image: '/trend-des/LSL_B2_Hikkaduwa-Beach_1920x700.jpg', title: 'Hikkaduwa Surf', tag: 'Coastal' },
              ...destinations,
              { id: 't3', image: '/trend-des/Gangaramaya-Temple-1920x1000-1.jpg', title: 'Gangaramaya', tag: 'Spiritual' }
            ].map((item) => (
              <div key={item.id} className="gallery-item">
                <img src={item.image} alt={item.title} className="gallery-img" />
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>{item.title}</h3>
                    <p>{item.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Journal Section */}
        <section className={`journal-section ${visibleSections.has('journal') ? 'visible' : ''}`} id="journal">
          <div className="section-header">
            <span className="section-tag">TRAVEL STORIES</span>
            <h2 className="section-title">From Our Journal</h2>
            <p className="section-subtitle">
              Stories, tips, and inspiration from our travels around the globe.
            </p>
          </div>

          <div className="journal-grid">
            {journalEntries.map((entry, i) => (
              <article className="journal-card" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="journal-img-wrapper">
                  <img src={entry.image} alt={entry.title} className="journal-img" />
                  <span className="journal-category">{entry.category}</span>
                </div>
                <div className="journal-content">
                  <span className="journal-date">{entry.date}</span>
                  <h3>{entry.title}</h3>
                  <p>{entry.excerpt}</p>
                  <a className="journal-read-more" href="#" onClick={(e) => { e.preventDefault(); setSelectedJournal(entry); }}>Read Full Story →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className={`testimonials-section ${visibleSections.has('testimonials') ? 'visible' : ''}`} id="testimonials">
          <div className="section-header">
            <span className="section-tag">TESTIMONIALS</span>
            <h2 className="section-title">What Our Travelers Say</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <div>
                    <h4>{t.name}</h4>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className={`about-section ${visibleSections.has('about') ? 'visible' : ''}`} id="about">
          <div className="about-inner">
            <div className="about-image-col">
              <img src="/last/istockphoto-1446375142-612x612.jpg" alt="About WANDER" className="about-img" />
              <div className="about-badge">
                <h3>10+</h3>
                <p>Years of Excellence</p>
              </div>
            </div>
            <div className="about-text-col">
              <span className="section-tag">ABOUT US</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>We Make Travel Extraordinary</h2>
              <p>
                Founded in 2016, WANDER was born from a simple belief: travel should be transformative.
                We partner with local experts in over 150 destinations to craft journeys that go beyond sightseeing.
              </p>
              <p>
                Our team of passionate travel designers works closely with you to understand your style,
                interests, and dreams — then builds an experience that exceeds your imagination.
              </p>
              <div className="about-highlights">
                <div className="about-highlight-item">
                  <span className="highlight-icon"><CheckCircle size={16} /></span>
                  <span>100% Personalized Itineraries</span>
                </div>
                <div className="about-highlight-item">
                  <span className="highlight-icon"><CheckCircle size={16} /></span>
                  <span>24/7 Concierge Support</span>
                </div>
                <div className="about-highlight-item">
                  <span className="highlight-icon"><CheckCircle size={16} /></span>
                  <span>Sustainable & Ethical Travel</span>
                </div>
                <div className="about-highlight-item">
                  <span className="highlight-icon"><CheckCircle size={16} /></span>
                  <span>Flexible Cancellation Policy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className={`newsletter-section ${visibleSections.has('newsletter') ? 'visible' : ''}`} id="newsletter">
          <div className="newsletter-inner">
            <h2>Ready for Your Next Adventure?</h2>
            <p>Subscribe to our newsletter and get exclusive travel deals, tips, and inspiration delivered to your inbox.</p>
            {subscribed ? (
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: 'var(--accent)' }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Thank You!</h3>
                <p style={{ margin: 0, color: 'var(--white)' }}>You have successfully subscribed to our newsletter.</p>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
                <input type="email" required placeholder="Enter your email address" className="newsletter-input" />
                <button type="submit" className="newsletter-btn">Subscribe</button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">WANDER.</div>
            <p>Crafting extraordinary travel experiences since 2016. Let us help you discover the world's most beautiful destinations.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('destinations'); }}>Destinations</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('experiences'); }}>Experiences</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('journal'); }}>Journal</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Cancellation Policy</a></li>
            </ul>
          </div>
          <div className="footer-col" style={{ marginTop: '1rem' }}>
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--white)' }}>Follow Us</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Camera size={18} /> Instagram</a></li>
              <li><a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MessageCircle size={18} /> Twitter</a></li>
              <li><a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Users size={18} /> Facebook</a></li>
              <li><a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Video size={18} /> YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} WANDER Travel Experiences. Made with passion.
        </div>
      </footer>
      
      {/* Experience Modal */}
      {selectedExperience && (
        <div className="modal-overlay" onClick={() => setSelectedExperience(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedExperience(null)}>×</button>
            <div className="modal-img-wrapper" style={{ height: '350px', width: '100%', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
              <img src={selectedExperience.image} alt={selectedExperience.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '3rem' }}>
              <span className="journal-category" style={{ position: 'relative', top: 0, left: 0, display: 'inline-block', marginBottom: '1rem' }}>Curated Experience</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.8rem', color: 'var(--primary)', lineHeight: 1.2 }}>{selectedExperience.title} {selectedExperience.icon}</h2>
              <p style={{ lineHeight: 1.8, color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>{selectedExperience.desc}</p>
              <p style={{ lineHeight: 1.8, color: 'var(--text-main)', fontSize: '1.1rem' }}>Immerse yourself completely in our signature {selectedExperience.title.toLowerCase()} package. We take care of every meticulous detail - from private transfers and premier gear, to exclusive access guided by our seasoned experts. Your journey will be tailored precisely to match your unique pace and interests, making sure you walk away with nothing but remarkable memories and a profound connection to the culture.</p>
              <button className="hero-cta" style={{ marginTop: '2rem' }} onClick={() => { setSelectedExperience(null); handleOpenBooking(selectedExperience.title); }}>Book This Experience</button>
            </div>
          </div>
        </div>
      )}

      {/* Journal Modal */}
      {selectedJournal && (
        <div className="modal-overlay" onClick={() => setSelectedJournal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedJournal(null)}>×</button>
            <div className="modal-img-wrapper" style={{ height: '350px', width: '100%', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
              <img src={selectedJournal.image} alt={selectedJournal.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '3rem' }}>
              <span className="journal-category" style={{ position: 'relative', top: 0, left: 0, display: 'inline-block', marginBottom: '1rem' }}>{selectedJournal.category}</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.8rem', color: 'var(--primary)', lineHeight: 1.2 }}>{selectedJournal.title}</h2>
              <p className="journal-date" style={{ marginBottom: '2rem', fontSize: '1rem', opacity: 0.8 }}>Written on {selectedJournal.date}</p>
              <p style={{ lineHeight: 1.8, color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>{selectedJournal.excerpt}</p>
              <p style={{ lineHeight: 1.8, color: 'var(--text-main)', fontSize: '1.1rem' }}>Traveling isn't just about the places you visit; it's about the perspectives you gain. When we embarked on this journey, we were immediately struck by the seamless blend of history, culture, and nature. From engaging with local artisans and tasting authentic, world-class cuisine to witnessing sunsets that painted the sky in unimaginable hues, every single moment felt tailor-made. This location effortlessly offers a perfect balance of serene relaxation and thrilling adventures. If you’re looking to redefine your itinerary and escape the ordinary, this spot deserves to be placed right at the top of your travel bucket list.</p>
            </div>
          </div>
        </div>
      )}

      {/* Destination Modal */}
      {selectedDestination && (
        <div className="modal-overlay" onClick={() => setSelectedDestination(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedDestination(null)}>×</button>
            <div className="modal-img-wrapper" style={{ height: '350px', width: '100%', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
              <img src={selectedDestination.image} alt={selectedDestination.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '3rem' }}>
              <span className="destination-tag" style={{ position: 'relative', top: 0, left: 0, display: 'inline-block', marginBottom: '1rem' }}>{selectedDestination.tag}</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', lineHeight: 1.2 }}>{selectedDestination.title}</h2>
                <div className="destination-rating" style={{ position: 'relative', top: 0, right: 0, fontSize: '1.2rem', padding: '0.5rem 1rem' }}>★ {selectedDestination.rating}</div>
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '1.5rem' }}>{selectedDestination.price}</p>
              <p style={{ lineHeight: 1.8, color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Discover the beauty and wonder of {selectedDestination.title}. This handpicked destination offers the perfect blend of adventure, culture, and relaxation.
              </p>
              <p style={{ lineHeight: 1.8, color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Your journey includes premium accommodations, expert local guides, and exclusive access to the most breathtaking spots. Whether you seek thrilling exploration or serene tranquility, this customized package ensures a truly memorable experience. Immerse yourself in the local heritage and savor every spectacular moment.
              </p>
              <button className="hero-cta" onClick={() => { setSelectedDestination(null); handleOpenBooking(selectedDestination.title); }}>Book This Destination</button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" style={{ maxWidth: '600px', padding: '3rem' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBookingModal(false)}>×</button>
            <span className="section-tag" style={{ marginBottom: '1rem', display: 'inline-block' }}>BOOK YOUR JOURNEY</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary)' }}>Start Your Adventure</h2>
            
            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Booking Sent!</h3>
                <p style={{ color: 'var(--text-main)' }}>Check your email for the confirmation details.</p>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleBookingSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Full Name</label>
                  <input type="text" name="name" required placeholder="John Doe" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Email Address</label>
                  <input type="email" name="email" required placeholder="john@example.com" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Interested In (Destination / Experience)</label>
                  <input type="text" name="interest" defaultValue={bookingPrefill} placeholder="e.g. Ella, Sky Adventures..." style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Travel Date</label>
                    <input type="date" name="date" required style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', fontFamily: 'inherit' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Travelers</label>
                    <input type="number" name="travelers" min="1" required defaultValue="2" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Special Requirements</label>
                  <textarea name="requirements" rows="4" placeholder="Any dietary requirements, accessibility needs, or special occasions?" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', resize: 'vertical', fontFamily: 'inherit' }}></textarea>
                </div>
                <button type="submit" className="hero-cta" style={{ width: '100%', opacity: bookingLoading ? 0.7 : 1 }} disabled={bookingLoading}>
                  {bookingLoading ? 'Sending...' : 'Send Booking Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
