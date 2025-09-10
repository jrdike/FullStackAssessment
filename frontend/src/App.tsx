import { dummyCards } from './data/devcard'
import { useState, useEffect } from 'react'
import type { Devcard } from './types/devcard'
import axios from 'axios'

//I used this from https://flowbite.com/docs/components/buttons/ (specifically the one labelled alternative) as I'm not the best with styling
const defaultButtonCSS: string = "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//Modified CSS for main buttons
const mainButtonCSS: string = "w-1/5 h-48 align-middle py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"

let currentCol: string = "firstclick"

/**
 * The main app for the frontend
 * @returns React app
 */
function App() {
  const [cards, setCards] = useState(dummyCards)

  /**
   * Remaps the cards for React useState
   */
  function mapCards() {
    setCards((cards) => (cards.map(card => card)))
  }

  //These functions all call a certain route in backend/index.ts

  /**
   * Calls the makeTable route
   */
  function makeTable() {
    axios.get("http://localhost:3000/")
  }

  /**
   * Calls the resetTable route
   */
  function resetTable() {
    axios.get("http://localhost:3000/reset")
  }

  /**
   * Calls the addCard route
   * @param card Card to add
   */
  function addCard(card: Devcard) {
    let num_card = card.id
    let click_card = card.clicks
    let time_card = card.firstclick
    axios.post('http://localhost:3000/', {
      num: num_card,
      click: click_card,
      time: time_card
    })
  }
  
  /**
   * Calls the getCards route and updates cards
   */
  function getCards() {
    axios.post('http://localhost:3000/cards', {
      col: currentCol
    }).then((res)=>{
      setCards(res.data)
    })
  }

  /**
   * Calls the getCount route
   * @returns number of rows
   */
  function getCount() {
    let count: Number = 0
    axios.get('http://localhost:3000/cards').then((res)=>{
      count = Number(res.data[0].count)
    })
    return count
  }

  //Attempt at using React hooks
  useEffect(()=>{
    makeTable()
  })

  //Did not have time to implement API calls here, so this is mostly frontend
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
                firstclick: Date.now()
              } : c))
            ))
          }}>
            <h3 className="font-bold text-3xl">{card.id}</h3>
            <p className="align-bottom">Clicks: {card.clicks}</p>
            <p className="align-bottom">{card.firstclick >= 9223372036854775000 ? "Never Clicked" : new Date(card.firstclick).toUTCString()}</p>
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

/**
 * Method that sorts the cards in-place for the frontend implementation
 * @param cards Array of Devcards
 * @param click Determines whether to sort by click or by timestamp
 */
function sortCards(cards: Devcard[], click: boolean) {
  cards.sort((a: Devcard, b: Devcard) => {
    if (click) {
      return b.clicks - a.clicks
    } else {
      return a.firstclick - b.firstclick
    }
  })
}

export default App
