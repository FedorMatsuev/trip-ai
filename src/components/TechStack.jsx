import React from 'react'

const TechStack = () => {
  const techs = [
    { icon: '⚛️', name: 'React', desc: 'Фреймворк' },
    { icon: '🚀', name: 'Vite', desc: 'Сборка' },
    { icon: '🧠', name: 'AI API', desc: 'Искусственный интеллект' },
    { icon: '📡', name: 'Геокодинг', desc: 'Nominatim API' },
    { icon: '💬', name: 'VK Bot', desc: 'Бот-ассистент', link: 'https://vk.ru/club236820375' },
    { icon: '🎨', name: 'CSS3', desc: 'Стилизация' },
  ]

  return (
    <section id="tech" style={{ padding: '60px 0', background: 'white' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2em', color: '#2d3748' }}>
          Технологии проекта
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(6, 1fr)', 
          gap: '20px',
          textAlign: 'center' 
        }}>
          {techs.map((tech, i) => (
            <div key={i} style={{
              padding: '25px 15px',
              background: '#f8f9fa',
              borderRadius: '12px',
              transition: 'transform 0.3s',
              cursor: tech.link ? 'pointer' : 'default'
            }}
            onClick={() => tech.link && window.open(tech.link, '_blank')}
            >
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>{tech.icon}</div>
              <h4 style={{ fontSize: '14px', marginBottom: '5px' }}>{tech.name}</h4>
              <p style={{ fontSize: '12px', color: '#888' }}>{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack