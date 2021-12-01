import { createStore } from 'redux'

// Actions Types and Action Creators

// Actions Types

const TROGDOR_ATTACKS = 'Trogdor Attacks'
const MAC_ATTACKS = 'Mac Attacks'
const MAC_HEALS = 'Mac Heals'

// Action Creator
// A function that takes data in and returns an action

export const trogdorAttacksAction = (data) => {
  return {
    type: TROGDOR_ATTACKS,
    damage: data
  }
}

export const macAttacksAction = (data) => {
  return {
    type: MAC_ATTACKS,
    damage: data
  }
}

export const macHealsAction = (data) => {
  return {
    type: MAC_HEALS,
    heal: data
  }
}

/**
 * By convention, our actions are structured like so:
 *  {
 *    type: tells us the action that was done
 *    payload: data that actually happens
 *  }
 *
 * Mac Attacks, Trogdor Attacks, Mac Heals
 *  */

const initialState = {
  trogdorHealth: 1000,
  macHealth: 400
}

// If state is undefined, assign state to initialState
const reducer = (state = initialState, action) => {
  // So we'll modify state based on the actions and return a new state
  console.log('an action has been dispatched ', action.type)
  console.log('spreading state', {...state});
  switch (action.type) {
    case TROGDOR_ATTACKS:
      // if action.type is 'Trogdor Attacks', go here
      // the damage done will be a damage property on the action
      // my goal is to return state where mac health has been hit by trogdor damage
      // just like react, we cannot directly modify state
      // state.macHealth = something
      return {...state, macHealth: state.macHealth - action.damage }
    case MAC_ATTACKS:
      return {...state, trogdorHealth: state.trogdorHealth - action.damage }
    case MAC_HEALS:
      return {...state, macHealth: state.macHealth + action.heal}
    default:
      return state;
  }
}

const store = createStore(reducer);

// What exactly is a store????
console.log(store);

export default store;

/**
 * WHAT DOES THE STORE HAVE???
 * - dispatch -- a method that accepts an ACTION and sends it to the store's reducer
 * - subscribe -- a method that is kind of like an event listener. It says that "whenever state changes, I will call any subscriber to the store with the state"
 * - getState -- a method that retrieves the current state
 */
