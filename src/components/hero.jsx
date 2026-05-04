import React from 'react'

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
            Оптимизируйте маршруты, экономьте время и деньги
            с помощью передовых AI-алгоритмов
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Точность расчёта</span>
            </div>
            <div className="stat">
              <span className="stat-number">30%</span>
              <span className="stat-label">Экономия времени</span>
            </div>
            <div className="stat">
              <span className="stat-number">25%</span>
              <span className="stat-label">Снижение стоимости</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero