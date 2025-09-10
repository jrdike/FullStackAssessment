import { dummyCards } from './data/devcard'
import { useState } from 'react'
import type { Devcard } from './types/devcard'

//I used this from https://flowbite.com/docs/components/buttons/ (specifically the one labelled alternative) as I'm not the best with styling
const defaultButtonCSS: string = "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//Modified CSS for main buttons
const mainButtonCSS: string = "w-1/5 h-48 align-middle py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"

function App() {
  const [cards, setCards] = useState(dummyCards)

  function mapCards() {
    setCards((cards) => (cards.map(card => card)))
  }

  return (
    <>
      <div className="py-10 text-center">
        {cards.map(card => (
          <button id={card.id} className={mainButtonCSS} onClick = {() => {
            setCards((cards) => 
            (
              cards.map(c => (c.id === card.id ? {
                id: card.id,
                clicks: card.clicks + 1,
                timestamp: card.timestamp == null ? new Date() : card.timestamp
              } : c))
            ))
          }}>
            <h3 className="font-bold text-3xl">{card.id}</h3>
            <p className="align-bottom">Clicks: {card.clicks}</p>
            <p className="align-bottom">{card.timestamp == null ? "Never Clicked" : card.timestamp.toUTCString()}</p>
          </button>
        ))}
      </div>
      <div className="text-center">
        <button id="sort1" className={defaultButtonCSS} onClick = {() => {
          sortCards(cards, true)
          mapCards()
        }}>
          Sort by most clicked
        </button>
        <button id="sort2" className={defaultButtonCSS} onClick = {() => {
          sortCards(cards, false)
          mapCards()
        }}>
          Sort by earliest clicked
        </button>
        <br></br>
        <button id="clear" className={defaultButtonCSS} onClick = {() => {setCards((cards) => dummyCards)}}>
          Clear
        </button>
      </div>
    </>
  )
}

function sortCards(cards: Devcard[], click: boolean) {
  cards.sort((a: Devcard, b: Devcard) => {
    if (click) {
      return b.clicks - a.clicks
    } else {
      let a_time = a.timestamp
      let b_time = b.timestamp
      if (a_time == null && b_time == null) return 0
      else if (b_time == null) return -1
      else if (a_time == null) return 1
      else return a_time.getTime() - b_time.getTime()
    }
  })
}

export default App
