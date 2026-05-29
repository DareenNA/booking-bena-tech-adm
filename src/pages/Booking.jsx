import { useState, useEffect } from 'react';
import gsap from 'gsap';

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [meetingType, setMeetingType] = useState('online');

  const availableDates = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  const availableTimes = ['10:00 AM', '11:30 AM', '2:00 PM', '4:00 PM'];

  useEffect(() => {
    gsap.fromTo('.reveal-up', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)' }}>
      
      {/* Left Pane - Sticky Visual (Hidden on Mobile) */}
      <div className="d-none d-md-flex" style={{ 
        flex: 1, 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        padding: '3rem', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        borderRight: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="/assets/hero_3d.png" alt="Architecture" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)' }}></div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, marginTop: '80px' }}>
          <h1 className="display-1 reveal-up" style={{ marginBottom: '1rem' }}>Initiate Protocol.</h1>
          <p className="text-grey reveal-up" style={{ fontSize: '1.2rem', maxWidth: '400px', lineHeight: 1.6 }}>
            Schedule a technical alignment with our architecture team. We don't do sales pitches, we architect solutions.
          </p>
        </div>

        <div className="reveal-up" style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '2rem' }}>
          <div>
            <p style={{ color: 'var(--text-grey)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Response Time</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>&lt; 2 Hours</p>
          </div>
          <div>
            <p style={{ color: 'var(--text-grey)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Direct Line</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>info@bena-tech.com</p>
          </div>
        </div>
      </div>

      {/* Right Pane - Scrollable Booking Flow */}
      <div style={{ flex: 1, padding: '8rem 4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '500px' }}>
          
          <h2 className="reveal-up d-md-none display-2" style={{ marginBottom: '3rem' }}>Book Meeting</h2>

          {/* Step 1: Details */}
          <div className="reveal-up" style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--text-white)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>1</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>Client Details</h3>
            </div>
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <input type="text" required placeholder="First Name" style={{ flex: 1, padding: '1.2rem', background: 'transparent', border: '1px solid var(--border-color)', borderBottom: '1px solid var(--text-grey)', color: 'var(--text-white)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} />
                <input type="text" required placeholder="Last Name" style={{ flex: 1, padding: '1.2rem', background: 'transparent', border: '1px solid var(--border-color)', borderBottom: '1px solid var(--text-grey)', color: 'var(--text-white)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }} />
              </div>
              
              <input type="email" required placeholder="Work Email" style={{ width: '100%', padding: '1.2rem', background: 'transparent', border: '1px solid var(--border-color)', borderBottom: '1px solid var(--text-grey)', color: 'var(--text-white)', fontSize: '1rem', outline: 'none', marginBottom: '1.5rem', transition: 'border-color 0.3s' }} />

              <select required style={{ width: '100%', padding: '1.2rem', background: 'transparent', border: '1px solid var(--border-color)', borderBottom: '1px solid var(--text-grey)', color: 'var(--text-white)', fontSize: '1rem', outline: 'none', appearance: 'none' }}>
                <option value="" disabled selected>Select Primary Interest...</option>
                <option value="web">Web Architecture</option>
                <option value="mobile">Mobile Systems</option>
                <option value="automation">Process Automation</option>
              </select>
            </form>
          </div>

          {/* Step 2: Time */}
          <div className="reveal-up" style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--text-white)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>2</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>Select Availability</h3>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', padding: '0.4rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <button onClick={() => setMeetingType('online')} style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: 'none', background: meetingType === 'online' ? 'var(--text-white)' : 'transparent', color: meetingType === 'online' ? '#000' : 'var(--text-white)', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>Remote</button>
              <button onClick={() => setMeetingType('inperson')} style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: 'none', background: meetingType === 'inperson' ? 'var(--text-white)' : 'transparent', color: meetingType === 'inperson' ? '#000' : 'var(--text-white)', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>On-site</button>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem', scrollbarWidth: 'none' }}>
              {availableDates.map((date, idx) => {
                const isSelected = selectedDate === idx;
                return (
                  <button key={idx} onClick={() => setSelectedDate(idx)} style={{ minWidth: '80px', padding: '1rem 0', borderRadius: '12px', border: `1px solid ${isSelected ? 'var(--primary-orange)' : 'var(--border-color)'}`, background: isSelected ? 'rgba(231,73,4,0.1)' : 'transparent', color: isSelected ? 'var(--primary-orange)' : 'var(--text-white)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 500 }}>{date.getDate()}</span>
                  </button>
                )
              })}
            </div>

            <div style={{ opacity: selectedDate !== null ? 1 : 0.3, pointerEvents: selectedDate !== null ? 'auto' : 'none', transition: 'opacity 0.3s' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                {availableTimes.map((time, idx) => (
                  <button key={idx} onClick={() => setSelectedTime(idx)} style={{ padding: '1.2rem', borderRadius: '12px', border: `1px solid ${selectedTime === idx ? 'var(--primary-orange)' : 'var(--border-color)'}`, background: selectedTime === idx ? 'var(--primary-orange)' : 'transparent', color: 'var(--text-white)', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500 }}>
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="btn btn-primary reveal-up" style={{ width: '100%', opacity: (selectedDate !== null && selectedTime !== null) ? 1 : 0.5, pointerEvents: (selectedDate !== null && selectedTime !== null) ? 'auto' : 'none', padding: '1.2rem' }}>
            Confirm Schedule
          </button>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .d-md-flex { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Booking;
