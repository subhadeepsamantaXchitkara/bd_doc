import React from 'react'

const particles = [
  ['#ffcf33', '12%', '20%', '0s'],
  ['#ff6b8a', '84%', '23%', '.08s'],
  ['#69d2e7', '20%', '72%', '.16s'],
  ['#fff3b0', '78%', '68%', '.24s'],
  ['#a8e063', '9%', '48%', '.32s'],
  ['#f38630', '91%', '48%', '.4s'],
  ['#ffcf33', '34%', '11%', '.48s'],
  ['#ff6b8a', '66%', '14%', '.56s'],
  ['#69d2e7', '31%', '87%', '.64s'],
  ['#fff3b0', '69%', '86%', '.72s'],
]

const WelcomeScreen = ({ isExiting, onStart }) => (
  <main className={`celebration-welcome ${isExiting ? 'celebration-welcome--exiting' : ''}`}>
    <div className="celebration-welcome__glow" aria-hidden="true" />
    <div className="celebration-welcome__confetti" aria-hidden="true">
      {particles.map(([color, x, y, delay], index) => (
        <span
          key={index}
          style={{ '--particle-color': color, '--particle-x': x, '--particle-y': y, '--particle-delay': delay }}
        />
      ))}
    </div>
    <div className="celebration-welcome__content">
      <p className="celebration-welcome__eyebrow">A little birthday magic awaits</p>
      <button className="celebration-welcome__button" type="button" onClick={onStart}>
        Let's Celebrate Together 🎉
      </button>
      <p className="celebration-welcome__hint">Tap to open your surprise</p>
    </div>
  </main>
)

export default WelcomeScreen