import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-color)',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-white)'
      }}>
        <div className="reveal-up" style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid var(--border-color)',
            borderTopColor: 'var(--primary-orange)',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1.5rem auto'
          }}></div>
          <p style={{ letterSpacing: '0.1em', fontSize: '0.9rem', color: 'var(--text-grey)', textTransform: 'uppercase' }}>Authenticating...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
