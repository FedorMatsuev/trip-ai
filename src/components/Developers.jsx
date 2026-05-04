import React from 'react'

const team = [
  {
    name: 'Антонович Михаил Алексеевич',
    role: 'Backend-разработчик',
    description: 'Разработка VK-бота, серверная логика, интеграция API',
    photo: '/src/assets/antonovich.jpg'
  },
  {
    name: 'Гнусов Артём Евгеньевич',
    role: 'Frontend-разработчик',
    description: 'Разработка пользовательского интерфейса, дизайн, вёрстка сайта',
    photo: '/src/assets/gnusov.jpg'
  },
  {
    name: 'Мацуев Фёдор Васильевич',
    role: 'Frontend-разработчик и тестировщик',
    description: 'Разработка сайта, вёрстка, подготовка презентации проекта, тестирование',
    photo: '/src/assets/matsuev.jpg'
  }
]

const Developers = () => {
  return (
    <section id="developers" style={{ padding: '60px 0' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2em', color: '#4a5568' }}>Разработчики</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {team.map((member, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '30px 20px',
              background: 'white',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
            }}>
              <img 
                src={member.photo} 
                alt={member.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '15px',
                  border: '3px solid #667eea'
                }}
              />
              <h3 style={{ margin: '10px 0 5px' }}>{member.name}</h3>
              <h4 style={{ color: '#667eea', marginBottom: '10px', fontSize: '14px' }}>{member.role}</h4>
              <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Developers