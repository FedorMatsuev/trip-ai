import React from 'react'

const Developers = () => {
  return (
    <section id="developers" style={{ padding: '60px 0' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2em', color: '#4a5568' }}>Разработчики</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          
          <div style={{ textAlign: 'center', padding: '30px 20px', background: 'white', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#667eea', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '36px', fontWeight: 'bold' }}>ФМ</div>
            <h3>Мацуев Фёдор Васильевич</h3>
            <h4 style={{ color: '#667eea', marginBottom: '10px' }}>Frontend-разработчик и тестировщик</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Разработка сайта, вёрстка, подготовка презентации проекта, тестирование</p>
          </div>

          <div style={{ textAlign: 'center', padding: '30px 20px', background: 'white', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#764ba2', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '36px', fontWeight: 'bold' }}>АГ</div>
            <h3>Гнусов Артём Евгеньевич</h3>
            <h4 style={{ color: '#667eea', marginBottom: '10px' }}>Frontend-разработчик</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Разработка пользовательского интерфейса, дизайн, вёрстка сайта</p>
          </div>

          <div style={{ textAlign: 'center', padding: '30px 20px', background: 'white', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#0f3460', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '36px', fontWeight: 'bold' }}>МА</div>
            <h3>Антонович Михаил Алексеевич</h3>
            <h4 style={{ color: '#667eea', marginBottom: '10px' }}>Backend-разработчик</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Разработка VK-бота, серверная логика, интеграция API</p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Developers