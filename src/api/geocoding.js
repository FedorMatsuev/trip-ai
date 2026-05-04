import axios from 'axios'

// Функция для поиска полного адреса с номером дома
export const getCoordinates = async (address) => {
  try {
    console.log('🔍 Ищем адрес:', address)
    
    // Разбиваем адрес на части
    const parts = address.split(',').map(p => p.trim())
    const mainPart = parts[0] // "ул. Тверская 15"
    const city = parts[1] || 'Москва' // город по умолчанию
    
    // Пробуем разные варианты запроса
    const searchQueries = [
      address, // полный адрес
      `${mainPart}, ${city}`, // улица + дом + город
      `${mainPart}, Москва`, // улица + дом + Москва
      mainPart, // только улица и дом
      `${mainPart.split(' ')[0]} ${mainPart.split(' ')[1]}`, // только улица
    ]
    
    for (const query of searchQueries) {
      try {
        console.log('Пробуем запрос:', query)
        
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: query,
            format: 'json',
            limit: 3,
            addressdetails: 1,
            'accept-language': 'ru'
          },
          headers: {
            'User-Agent': 'TripAI-Calculator/1.0'
          },
          timeout: 8000
        })
        
        if (response.data && response.data.length > 0) {
          console.log('✅ Найдено:', response.data[0].display_name)
          return {
            lat: parseFloat(response.data[0].lat),
            lon: parseFloat(response.data[0].lon),
            displayName: response.data[0].display_name
          }
        }
      } catch (err) {
        console.log(`❌ Не удалось найти: ${query}`)
      }
    }
    
    return null
  } catch (error) {
    console.error('Ошибка геокодирования:', error)
    return null
  }
}

// Функция для расчета расстояния
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return Math.round(R * c * 10) / 10
}

// Функция для расчета времени
export const calculateTime = (distance, address = null) => {
  // Базовая скорость
  let averageSpeed = 45 // км/ч для города
  
  // Если адрес содержит ключевые слова, корректируем скорость
  if (address) {
    const lowerAddr = address.toLowerCase()
    if (lowerAddr.includes('трасса') || lowerAddr.includes('шоссе')) {
      averageSpeed = 80
    } else if (lowerAddr.includes('центр') || lowerAddr.includes('площадь')) {
      averageSpeed = 30
    }
  }
  
  const timeHours = distance / averageSpeed
  const timeMinutes = Math.round(timeHours * 60)
  
  return {
    hours: Math.floor(timeMinutes / 60),
    minutes: timeMinutes % 60,
    totalMinutes: timeMinutes
  }
}