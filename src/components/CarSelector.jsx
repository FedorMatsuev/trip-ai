import React from 'react'

const CarSelector = ({ selectedCar, setSelectedCar }) => {
  const carTypes = [
    { id: 'comfort', name: 'Комфорт', priceCoeff: 1.0, icon: '🚗', description: 'Стандартный автомобиль' },
    { id: 'business', name: 'Бизнес', priceCoeff: 1.5, icon: '🚙', description: 'Премиум-класс' },
    { id: 'minivan', name: 'Минивен', priceCoeff: 1.7, icon: '🚐', description: 'Для компании до 7 человек' },
    { id: 'autonomous', name: 'Беспилотный', priceCoeff: 0.8, icon: '🤖', description: 'AI-управление (будущее)' }
  ]

  return (
    <section id="cars" className="car-selector">
      <div className="container">
        <h2>Выберите тип автомобиля</h2>
        <div className="car-grid">
          {carTypes.map(car => (
            <div
              key={car.id}
              className={`car-card ${selectedCar === car.id ? 'selected' : ''}`}
              onClick={() => setSelectedCar(car.id)}
            >
              <div className="car-icon">{car.icon}</div>
              <h3>{car.name}</h3>
              <p>{car.description}</p>
              <div className="price-coeff">
                Коэффициент: {car.priceCoeff}x
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CarSelector