import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // NEW: This state tracks if someone is logged in!
  const [loggedInUser, setLoggedInUser] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';
    try {
      const res = await axios.post(`http://localhost:5000/${endpoint}`, { email, password });
      
      if (isLogin) {
        // Success! Set the user state to trigger the Dashboard view
        setLoggedInUser(res.data.email); 
      } else {
        alert("Account Created! Now Login.");
        setIsLogin(true); // Switch back to the login form
      }
    } catch (err) { 
        alert(err.response ? err.response.data : "An error occurred"); 
    }
  };

  // ==========================================
  // VIEW 1: THE HOMEPAGE / DASHBOARD
  // ==========================================
  if (loggedInUser) {
    return (
      <div className="app-container">
        <div className="auth-card" style={{ width: '600px' }}>
          <h2>Welcome to the Dashboard!</h2>
          <p style={{ color: '#8892b0', marginBottom: '20px' }}>
            Logged in as: <strong style={{ color: '#00d4ff' }}>{loggedInUser}</strong>
          </p>
          
          {/* Aesthetic Capstone Stats Box */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', marginBottom: '20px', textAlign: 'left', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
            <h3 style={{ color: '#00d4ff', marginBottom: '5px' }}>LLM-Based Agentic AI</h3>
            <p style={{ color: '#8892b0', fontSize: '14px', marginBottom: '15px' }}>Tool-Using Reasoning Workflows Automation</p>
            <p style={{ margin: '8px 0' }}>🟢 <strong>System Status:</strong> Online & Secure</p>
            <p style={{ margin: '8px 0' }}>⚙️ <strong>CI/CD Pipeline:</strong> Active</p>
            <p style={{ margin: '8px 0' }}>🗄️ <strong>Database:</strong> MongoDB Connected</p>
          </div>

          <button 
            className="auth-button" 
            onClick={() => setLoggedInUser(null)} 
            style={{ background: 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)' }}
          >
            SECURE LOGOUT
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: THE LOGIN & SIGNUP PAGE
  // ==========================================
  return (
    <div className="app-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Capstone Portal' : 'Create Account'}</h2>
        
        <form onSubmit={handleSubmit}>
          <input className="auth-input" type="email" placeholder="Email Address" required onChange={e => setEmail(e.target.value)} />
          <input className="auth-input" type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
          <button className="auth-button" type="submit">
            {isLogin ? 'SECURE LOGIN' : 'SIGN UP'}
          </button>
        </form>

        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default App;


// 