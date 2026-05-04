import React, { useState } from 'react'

const RouteCalculator = ({ route, setRoute, onCalculate, selectedCar }) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onCalculate(route, selectedCar)
    setLoading(false)
  }

  return (
    <section id="calculator" className="route-calculator">
      <div className="container">
        <h2>Рассчитать поездку</h2>
        <form onSubmit={handleSubmit} className="calculator-form">
          <div className="form-group">
            <label>📍 Откуда</label>
            <input
              type="text"
              placeholder="Введите адрес или точку на карте"
              value={route.from}
              onChange={(e) => setRoute({ ...route, from: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>🏁 Куда</label>
            <input
              type="text"
              placeholder="Введите адрес назначения"
              value={route.to}
              onChange={(e) => setRoute({ ...route, to: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>📅 Дата и время</label>
            <input
              type="datetime-local"
              onChange={(e) => setRoute({ ...route, datetime: e.target.value })}
            />
          </div>
          
          <button type="submit" className="calculate-btn" disabled={loading}>
            {loading ? 'Расчёт...' : 'Рассчитать поездку'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default RouteCalculator