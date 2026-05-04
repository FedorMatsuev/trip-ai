import React, { useState } from 'react'
import { getCoordinates, calculateDistance, calculateTime } from './api/geocoding'
import { findLocalPlace } from './api/localPlaces'
import './index.css'
import ProjectInfo from './components/ProjectInfo'
import Developers from './components/Developers'
import TechStack from './components/TechStack'

function App() {
  const [calculation, setCalculation] = useState(null)
  const [selectedCar, setSelectedCar] = useState('comfort')
  const [route, setRoute] = useState({ from: '', to: '', datetime: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Функция для расчета поездки
  const calculateTrip = async () => {
    setLoading(true)
    setError('')
    
    try {
      console.log('Ищем адрес отправления:', route.from)
      console.log('Ищем адрес назначения:', route.to)
      
      // Сначала ищем в локальной базе
      let fromCoords = findLocalPlace(route.from)
      let toCoords = findLocalPlace(route.to)
      
      console.log('Локальная база - отправление:', fromCoords)
      console.log('Локальная база - назначение:', toCoords)
      
      // Если не нашли в локальной базе, ищем через API
      if (!fromCoords) {
        console.log('Ищем через API:', route.from)
        const apiCoords = await getCoordinates(route.from)
        if (apiCoords) {
          fromCoords = apiCoords
          console.log('API нашел:', apiCoords.displayName)
        }
      }
      
      if (!toCoords) {
        console.log('Ищем через API:', route.to)
        const apiCoords = await getCoordinates(route.to)
        if (apiCoords) {
          toCoords = apiCoords
          console.log('API нашел:', apiCoords.displayName)
        }
      }
      
      // Проверяем, нашли ли адреса
      if (!fromCoords) {
        setError(`❌ Не удалось найти адрес: "${route.from}". Попробуйте указать более точно (например: "Москва, Ленинградский вокзал")`)
        setLoading(false)
        return
      }
      
      if (!toCoords) {
        setError(`❌ Не удалось найти адрес: "${route.to}". Попробуйте указать более точно (например: "Москва, Красная площадь")`)
        setLoading(false)
        return
      }
      
      // Рассчитываем расстояние
      const distance = calculateDistance(
        fromCoords.lat, fromCoords.lon,
        toCoords.lat, toCoords.lon
      )
      
      // Рассчитываем время
      const timeObj = calculateTime(distance)
      const baseTime = timeObj.totalMinutes
      
      // Коэффициенты для разных типов авто
      const carCoefficients = {
        comfort: 1.0,
        business: 1.5,
        minivan: 1.7,
        autonomous: 0.8
      }
      
      // Базовые тарифы
      const basePricePerKm = 20
      const basePricePerMinute = 12
      const baseTariff = 100
      
      // Расчет стоимости
      let price = baseTariff + 
                  (distance * basePricePerKm) + 
                  (baseTime * basePricePerMinute)
      
      // Применяем коэффициент типа авто
      price = price * carCoefficients[selectedCar]
      
      // Учет времени суток (если указано)
      let finalTime = baseTime
      if (route.datetime) {
        const hour = new Date(route.datetime).getHours()
        // Час пик (8-10, 17-19)
        if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19)) {
          price = price * 1.2
          finalTime = Math.round(baseTime * 1.4)
        }
        // Ночное время (23-5)
        else if (hour >= 23 || hour <= 5) {
          price = price * 0.9
        }
      }
      
      // Округляем цену
      price = Math.round(price)
      
      // Альтернативные варианты
      const alternatives = [
        { 
          type: '🚗 Эконом', 
          price: Math.round(price * 0.7), 
          time: Math.round(finalTime * 1.3),
          description: 'Бюджетный вариант'
        },
        { 
          type: '✨ Комфорт+', 
          price: Math.round(price * 1.2), 
          time: Math.round(finalTime * 0.9),
          description: 'Повышенный комфорт'
        },
        { 
          type: '⚡ Экспресс', 
          price: Math.round(price * 1.5), 
          time: Math.round(finalTime * 0.7),
          description: 'Срочная доставка'
        }
      ]
      
      // AI рекомендация
      let recommendation = ''
      if (selectedCar === 'autonomous') {
        recommendation = '🤖 Беспилотный транспорт - самый экономичный и экологичный вариант! Экономия до 20% стоимости.'
      } else if (distance > 100) {
        recommendation = '🛣️ Для дальней поездки рекомендуем Бизнес-класс - больше комфорта и дополнительный багажник.'
      } else if (finalTime > 60) {
        recommendation = '⏱️ Учитывая пробки, рекомендуем выбрать Комфорт+ с возможностью использования выделенных полос.'
      } else if (selectedCar === 'minivan') {
        recommendation = '👨‍👩‍👧‍👦 Отличный выбор для компании! Минивен обеспечит комфорт всем пассажирам.'
      } else {
        recommendation = `✨ Оптимальный выбор: ${selectedCar === 'comfort' ? 'Комфорт' : 'Бизнес'} для вашего маршрута. AI рекомендует выехать в ближайшее время.`
      }
      
      const result = {
        time: finalTime,
        distance: Math.round(distance * 10) / 10,
        price: price,
        alternatives: alternatives,
        recommendation: recommendation,
        from: fromCoords.displayName || route.from,
        to: toCoords.displayName || route.to,
        fromShort: route.from,
        toShort: route.to
      }
      
      setCalculation(result)
    } catch (error) {
      console.error('Ошибка расчета:', error)
      setError('Произошла ошибка при расчете. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (route.from && route.to) {
      calculateTrip()
    } else {
      setError('Пожалуйста, введите точки отправления и назначения')
    }
  }

  // Форматирование времени
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours} ч ${mins} мин`
    }
    return `${mins} мин`
  }

  return (
    <div className="App">
      <header className="site-header">
        <div className="container">
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <span>Trip<span className="highlight">AI</span></span>
          </div>
          <nav>
            <ul>
              <li><a href="#home">Главная</a></li>
              <li><a href="#calculator">Калькулятор</a></li>
              <li><a href="#cars">Типы авто</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero">
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

      <section id="calculator" className="route-calculator">
        <div className="container">
          <h2>Рассчитать поездку</h2>
          <form className="calculator-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>📍 Откуда</label>
              <input
                type="text"
                placeholder="Например: Ленинградский вокзал, Красная площадь, Москва"
                value={route.from}
                onChange={(e) => setRoute({ ...route, from: e.target.value })}
                required
              />
              <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                💡 Поддерживаемые места: вокзалы, аэропорты, площади, улицы
              </small>
            </div>
            
            <div className="form-group">
              <label>🏁 Куда</label>
              <input
                type="text"
                placeholder="Например: Шереметьево, ВДНХ, Санкт-Петербург"
                value={route.to}
                onChange={(e) => setRoute({ ...route, to: e.target.value })}
                required
              />
            </div>
            
            <div className="form-group">
              <label>📅 Дата и время (опционально)</label>
              <input
                type="datetime-local"
                onChange={(e) => setRoute({ ...route, datetime: e.target.value })}
              />
            </div>
            
            {error && (
              <div style={{ 
                color: 'red', 
                marginBottom: '15px', 
                padding: '10px', 
                background: '#fee', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                ⚠️ {error}
              </div>
            )}
            
            <button type="submit" className="calculate-btn" disabled={loading}>
              {loading ? '🔍 Определяем маршрут...' : '🚗 Рассчитать поездку'}
            </button>
          </form>
        </div>
      </section>

      <section id="cars" className="car-selector">
        <div className="container">
          <h2>Выберите тип автомобиля</h2>
          <div className="car-grid">
            <div className={`car-card ${selectedCar === 'comfort' ? 'selected' : ''}`} onClick={() => setSelectedCar('comfort')}>
              <div className="car-icon">🚗</div>
              <h3>Комфорт</h3>
              <p>Стандартный автомобиль</p>
              <div className="price-coeff">Коэффициент: 1.0x</div>
            </div>
            <div className={`car-card ${selectedCar === 'business' ? 'selected' : ''}`} onClick={() => setSelectedCar('business')}>
              <div className="car-icon">🚙</div>
              <h3>Бизнес</h3>
              <p>Премиум-класс</p>
              <div className="price-coeff">Коэффициент: 1.5x</div>
            </div>
            <div className={`car-card ${selectedCar === 'minivan' ? 'selected' : ''}`} onClick={() => setSelectedCar('minivan')}>
              <div className="car-icon">🚐</div>
              <h3>Минивен</h3>
              <p>Для компании до 7 человек</p>
              <div className="price-coeff">Коэффициент: 1.7x</div>
            </div>
            <div className={`car-card ${selectedCar === 'autonomous' ? 'selected' : ''}`} onClick={() => setSelectedCar('autonomous')}>
              <div className="car-icon">🤖</div>
              <h3>Беспилотный</h3>
              <p>AI-управление (будущее)</p>
              <div className="price-coeff">Коэффициент: 0.8x</div>
            </div>
          </div>
        </div>
      </section>

      {calculation && (
        <>
          <section className="results">
            <div className="container">
              <h2>Результаты расчёта</h2>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '20px', 
                padding: '15px', 
                background: '#f8f9fa', 
                borderRadius: '10px' 
              }}>
                <p style={{ margin: '5px 0' }}>
                  <strong>📍 Откуда:</strong> {calculation.from}
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>🏁 Куда:</strong> {calculation.to}
                </p>
              </div>
              
              <div className="result-grid">
                <div className="result-item">
                  <span className="result-icon">📏</span>
                  <span className="result-label">Расстояние</span>
                  <span className="result-value">{calculation.distance} км</span>
                </div>
                <div className="result-item">
                  <span className="result-icon">⏱️</span>
                  <span className="result-label">Время в пути</span>
                  <span className="result-value">{formatTime(calculation.time)}</span>
                </div>
                <div className="result-item highlight">
                  <span className="result-icon">💰</span>
                  <span className="result-label">Стоимость</span>
                  <span className="result-value">{calculation.price} ₽</span>
                </div>
              </div>
              
              <div className="alternatives">
                <h3>🎯 Альтернативные варианты</h3>
                <div className="alternatives-list">
                  {calculation.alternatives.map((alt, idx) => (
                    <div key={idx} className="alternative-item">
                      <div>
                        <span className="alt-type">{alt.type}</span>
                        <div style={{ fontSize: '12px', color: '#666' }}>{alt.description}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="alt-price">{alt.price} ₽</div>
                        <div className="alt-time">{formatTime(alt.time)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="ai-recommendation">
            <div className="container">
              <div className="recommendation-card">
                <div className="ai-icon">🧠</div>
                <h3>AI Анализ маршрута</h3>
                <p>{calculation.recommendation}</p>
                <div className="ai-badge">
                  <span>⚡ Интеллектуальный расчёт</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <ProjectInfo />
      <TechStack />
      <Developers />
    </div>
  )
}

export default App