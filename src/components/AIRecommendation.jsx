import React from 'react'

const AIRecommendation = ({ calculation }) => {
  return (
    <section className="ai-recommendation">
      <div className="container">
        <div className="recommendation-card">
          <div className="ai-icon">🤖</div>
          <h3>AI Рекомендация</h3>
          <p>{calculation.recommendation}</p>
          <div className="ai-badge">
            <span>⚡ Оптимизировано AI</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIRecommendation