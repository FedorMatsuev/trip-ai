import React from 'react'

const Developers = () => {
  return (
    <section id="developers" style={{ padding: '60px 0' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2em', color: '#4a5568' }}>Разработчики</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          
          <div style={{ textAlign: 'center', padding: '15px 10px', background: 'white', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
            <img src="https://raw.githubusercontent.com/FedorMatsuev/trip-ai/main/public/matsuev.jpg" alt="Мацуев" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', border: '3px solid #667eea' }} />
            <h3>Мацуев Фёдор Васильевич</h3>
            <h4 style={{ color: '#667eea', marginBottom: '5px', fontSize: '13px' }}>Frontend-разработчик и тестировщик</h4>
            <p style={{ color: '#666', fontSize: '12px' }}>Разработка сайта, вёрстка, тестирование</p>
          </div>

          <div style={{ textAlign: 'center', padding: '15px 10px', background: 'white', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
            <img src="https://raw.githubusercontent.com/FedorMatsuev/trip-ai/main/public/gnusov.jpg" alt="Гнусов" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', border: '3px solid #667eea' }} />
            <h3>Гнусов Артём Евгеньевич</h3>
            <h4 style={{ color: '#667eea', marginBottom: '5px', fontSize: '13px' }}>Frontend-разработчик</h4>
            <p style={{ color: '#666', fontSize: '12px' }}>Разработка интерфейса, дизайн, вёрстка сайта</p>
          </div>

          <div style={{ textAlign: 'center', padding: '15px 10px', background: 'white', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
            <img src="https://raw.githubusercontent.com/FedorMatsuev/trip-ai/main/public/antonovich.jpg" alt="Антонович" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', border: '3px solid #667eea' }} />
            <h3>Антонович Михаил Алексеевич</h3>
            <h4 style={{ color: '#667eea', marginBottom: '5px', fontSize: '13px' }}>Backend-разработчик</h4>
            <p style={{ color: '#666', fontSize: '12px' }}>Разработка VK-бота, серверная логика, интеграция API</p>
          </div>

          <div style={{ textAlign: 'center', padding: '15px 10px', background: 'white', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
            <img src="https://raw.githubusercontent.com/FedorMatsuev/trip-ai/main/public/gromov.jpg" alt="Громов" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', border: '3px solid #667eea' }} />
            <h3>Громов Илья Александрович</h3>
            <h4 style={{ color: '#667eea', marginBottom: '5px', fontSize: '13px' }}>DevOps-инженер</h4>
            <p style={{ color: '#666', fontSize: '12px' }}>Настройка CI/CD, автоматизация, поддержка развёртывания, оптимизация цикла разработки</p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Developers