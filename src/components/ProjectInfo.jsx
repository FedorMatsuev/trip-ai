import React from 'react'

const ProjectInfo = () => {
  return (
    <section id="about" style={{ padding: '60px 0', background: '#f0f2f5' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2em', color: '#2d3748' }}>О проекте</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
          <div>
            <h3 style={{ marginBottom: '20px', fontSize: '1.4em', color: '#667eea' }}>
              Проект кафедры «Автоматизированные системы управления»
            </h3>
            <p><strong>🏫 Университет:</strong> МАДИ</p>
            <p><strong>📚 Кафедра:</strong> Автоматизированные системы управления</p>
            <p><strong>👥 Группа:</strong> 2бАСУ1</p>
            <p><strong>📅 Год:</strong> 2026</p>
            <p><strong>🤖 Направление:</strong> Искусственный интеллект в транспортных системах</p>
            <p><strong>📋 Тема:</strong> Интеллектуальная система расчёта поездок с AI-аналитикой</p>
            <p><strong>⚛️ Фреймворк:</strong> React + Vite</p>
            <p style={{ marginTop: '20px', lineHeight: '1.8', fontSize: '15px' }}>
              TripAI — это учебный проект, разработанный студентами группы 2бАСУ1 
              кафедры «Автоматизированные системы управления» МАДИ. Система использует 
              алгоритмы геокодирования и искусственный интеллект для точного расчёта 
              стоимости и времени поездок. Проект включает веб-интерфейс на React, 
              VK-бота и презентационные материалы.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600" 
              alt="Проект TripAI"
              style={{ 
                width: '100%', 
                maxWidth: '450px',
                borderRadius: '15px', 
                boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
              }}
            />
            <p style={{ marginTop: '15px', color: '#667eea', fontWeight: 'bold' }}>
              🚀 TripAI — умные поездки будущего
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectInfo