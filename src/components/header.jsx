import React from 'react'

const Header = () => {
  return (
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
            <li><a href="#about">О нас</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header