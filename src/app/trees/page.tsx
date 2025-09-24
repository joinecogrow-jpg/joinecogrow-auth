export default function TreesPage() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #F5F5F5, #E8F5E9)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          color: '#388E3C', 
          fontSize: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          🌳 Tree Tracking System
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
          Track your planted trees and monitor their growth - Join the EcoGrow movement!
        </p>
        
        <div style={{ 
          marginTop: '40px', 
          padding: '30px', 
          background: 'white',
          borderRadius: '20px',
          border: '3px solid #7CB342',
          boxShadow: '0 10px 30px rgba(124, 179, 66, 0.1)'
        }}>
          <h2 style={{ color: '#388E3C', marginBottom: '20px' }}>🌱 Coming Soon</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '15px', background: '#F1F8E9', borderRadius: '10px' }}>
              <h3 style={{ color: '#558B2F' }}>🌿 Virtual Tree Planting</h3>
              <p>Plant and track trees globally</p>
            </div>
            
            <div style={{ padding: '15px', background: '#E8F5E9', borderRadius: '10px' }}>
              <h3 style={{ color: '#388E3C' }}>📍 GPS Tracking</h3>
              <p>Real-time location monitoring</p>
            </div>
            
            <div style={{ padding: '15px', background: '#E3F2FD', borderRadius: '10px' }}>
              <h3 style={{ color: '#1976D2' }}>💧 Water Monitoring</h3>
              <p>Track watering schedules</p>
            </div>
            
            <div style={{ padding: '15px', background: '#FFF3E0', borderRadius: '10px' }}>
              <h3 style={{ color: '#F57C00' }}>🏆 NFT Certificates</h3>
              <p>Earn blockchain certificates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
