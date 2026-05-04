import React from 'react'

const ResultCard = ({ result }) => {
  return (
    <section className="results">
      <div className="container">
        <h2>Результаты расчёта</h2>
        <div className="result-grid">
          <div className="result-item">
            <span className="result-icon">⏱️</span>
            <span className="result-label">Время в пути</span>
            <span className="result-value">{result.time} мин</span>
          </div>
          <div className="result-item">
            <span className="result-icon">📏</span>
            <span className="result-label">Расстояние</span>
            <span className="result-value">{result.distance} км</span>
          </div>
          <div className="result-item highlight">
            <span className="result-icon">💰</span>
            <span className="result-label">Стоимость</span>
            <span className="result-value">{result.price} ₽</span>
          </div>
        </div>
        
        <div className="alternatives">
          <h3>Альтернативные варианты</h3>
          <div className="alternatives-list">
            {result.alternatives.map((alt, idx) => (
              <div key={idx} className="alternative-item">
                <span className="alt-type">{alt.type}</span>
                <span className="alt-price">{alt.price} ₽</span>
                <span className="alt-time">{alt.time} мин</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultCard