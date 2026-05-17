import React from 'react'

const FlyingCode = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes fall {
          0%   { transform: translateY(-100px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.07; }
          90%  { opacity: 0.07; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .fc {
          position: absolute;
          top: -50px;
          color: #667eea;
          font-family: monospace;
          font-weight: bold;
          white-space: nowrap;
          animation: fall linear infinite;
        }
      `}</style>
      <span className="fc" style={{ left: '10%', animationDuration: '12s', animationDelay: '0s', fontSize: '14px' }}>{'{ }'}</span>
      <span className="fc" style={{ left: '25%', animationDuration: '15s', animationDelay: '3s', fontSize: '18px' }}>const</span>
      <span className="fc" style={{ left: '40%', animationDuration: '10s', animationDelay: '6s', fontSize: '12px' }}>{'()'}</span>
      <span className="fc" style={{ left: '55%', animationDuration: '18s', animationDelay: '1s', fontSize: '20px' }}>{'</>'}</span>
      <span className="fc" style={{ left: '70%', animationDuration: '14s', animationDelay: '4s', fontSize: '16px' }}>{'=>'}</span>
      <span className="fc" style={{ left: '85%', animationDuration: '11s', animationDelay: '8s', fontSize: '14px' }}>import</span>
      <span className="fc" style={{ left: '15%', animationDuration: '16s', animationDelay: '2s', fontSize: '22px' }}>AI</span>
      <span className="fc" style={{ left: '50%', animationDuration: '13s', animationDelay: '5s', fontSize: '14px' }}>return</span>
      <span className="fc" style={{ left: '75%', animationDuration: '17s', animationDelay: '7s', fontSize: '18px' }}>function</span>
      <span className="fc" style={{ left: '35%', animationDuration: '10s', animationDelay: '9s', fontSize: '12px' }}>{'0'}</span>
      <span className="fc" style={{ left: '65%', animationDuration: '15s', animationDelay: '10s', fontSize: '16px' }}>{'1'}</span>
      <span className="fc" style={{ left: '90%', animationDuration: '12s', animationDelay: '11s', fontSize: '14px' }}>{'[]'}</span>
    </div>
  )
}

export default FlyingCode