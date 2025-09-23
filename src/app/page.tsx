export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: 'linear-gradient(135deg, #F5F5F5, #E8F5E9)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#388E3C', fontSize: '3rem', marginBottom: '20px' }}>
          🌱 Welcome to JoinEcoGrow
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
          Revolutionary Sustainable Living Platform with 750+ Features
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #7CB342' }}>
            <h2 style={{ color: '#388E3C' }}>🌳 Tree Tracking</h2>
            <p>Plant and track trees globally</p>
          </div>
          
          <div style={{ padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #7CB342' }}>
            <h2 style={{ color: '#388E3C' }}>🏗️ DIY Systems</h2>
            <p>Build eco-growing systems</p>
          </div>
          
          <div style={{ padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #29B6F6' }}>
            <h2 style={{ color: '#388E3C' }}>🤖 AI Assistant</h2>
            <p>Get expert gardening advice</p>
          </div>
        </div>
        
        <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(124, 179, 66, 0.1)', borderRadius: '10px' }}>
          <h3>Platform Status</h3>
          <p>✅ API: Operational</p>
          <p>✅ Features: 750</p>
          <p>✅ Version: 1.0.0</p>
        </div>
      </div>
    </div>
  )
}
