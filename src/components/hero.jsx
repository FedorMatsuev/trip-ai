import React from 'react'
import '../hero-animation.css'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <h1>
            Умный расчёт поездок с 
            <span className="ai-gradient"> искусственным интеллектом</span>
          </h1>
          <p className="hero-subtitle">
            Введите любой адрес - AI определит расстояние и рассчитает стоимость
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10M+</span>
              <span className="stat-label">Адресов в базе</span>
            </div>
            <div className="stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">Точность геокодинга</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Расчёт в реальном времени</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero