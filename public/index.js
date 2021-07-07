// The first thing we need to do is import something from redux to help us
// set up our store
import { createStore } from 'redux';

// Initialize our state outside everything else.
const initialState = {
  macHealth: 400,
  trogdorHealth: 1000,
};

// ACTION TYPES!!! -- Describes the action
// Action types are always all caps, separated by underscores
const TROGDOR_ATTACKS = 'Trogdor Attacks';
const MAC_ATTACKS = 'Mac Attacks';
const HEAL = 'whatever the heck is goin on';

// ACTION CREATORS!!!! - creates our action
// Action Creator is a function that returns an action

const macAttacks = (damage) => {
  // Here is where our action is actually created
  return {
    type: MAC_ATTACKS,
    damage: damage,
  };
};
// This function is our ACTION CREATOR
const trogdorAttacks = (damage) => {
  // Here is our action
  return {
    type: TROGDOR_ATTACKS,
    damage: damage,
  };
};
// This function is our ACTION CREATOR
const heal = (heal) => {
  // This is the action
  return {
    type: HEAL,
    heal: heal,
  };
};

/**
  Actions:
  - Mac Attacks
  - Trogdor Attacks
  - Heal
  Actions have two main properties:
    - type -- tells us what action was done
    - data / payload / some other property of the actual data
 */

// a reducer
// state = initialState says that, IF WE DO NOT HAVE STATE ALREADY, state should be
// initialState
const reducer = (state = initialState, action) => {
  // We could also use multiple if/elses, but switches are more easily organized.
  // If the action that happens does not exist in our switch cases, then we just
  // don't want to change anything.
  // The reducer will always return my new state.
  console.log('Action Received:', action.type);
  switch (action.type) {
    case TROGDOR_ATTACKS:
      // ... -- spread operator. This will copy our old state onto the new object we're creating
      // { ...state } -- We are going to copy all parts of state that are already there,
      // and then we will override the pieces the our actions tell us to
      return { ...state, macHealth: state.macHealth - action.damage };
    case MAC_ATTACKS:
      return { ...state, trogdorHealth: state.trogdorHealth - action.damage };
    case HEAL:
      return { ...state, macHealth: state.macHealth + action.heal };
    default:
      return state;
  }
};
// import { store } from './filePath'
// module.exports = {store}
// This call actually creates our store with the reducer
export const store = createStore(reducer);

// import store from './filePath'
// module.exports = store
// export default store;

console.log(store);

/**
  METHODS that exist on the store
   - dispatch - accept an ACTION and send it to the reducer
   - getState - returns the current state of the store
   - subscribe - takes in a callback function that it will call every time state changes
 */

// How to retrieve state changes:
const unsubscriber = store.subscribe(() => {
  console.log('Here is my new state: ', store.getState());
  const state = store.getState();
  macHealth.innerText = state.macHealth;
  enemyHealth.innerText = state.trogdorHealth;
});

// Old school DOM manipulation

const macHealth = document.getElementById('macHealth');
const enemyHealth = document.getElementById('enemyHealth');

document.getElementById('enemyAttack').addEventListener('click', () => {
  // We dispatched an action to the store that trogdor attacked me
  // store.dispatch({ type: 'Trogdor Attacks' });

  // store.dispatch({ type: TROGDOR_ATTACKS });

  // Action Creator version
  const trogdorAttacksAction = trogdorAttacks(100);
  store.dispatch(trogdorAttacksAction);
});

// Old school DOM manipulation
document.getElementById('macAttack').addEventListener('click', () => {
  // We dispatched an action to the store that trogdor attacked me

  // This version is ugly because we never want to manage string comparisons
  // store.dispatch({ type: 'Mac Attacks' });

  // We want to leverage Action Types
  // store.dispatch({ type: MAC_ATTACKS });

  // We want to leverage Action Creator
  const macAttacksAction = macAttacks(250);
  store.dispatch(macAttacksAction);
});

// Old school DOM manipulation
document.getElementById('heal').addEventListener('click', () => {
  // We dispatched an action to the store that trogdor attacked me
  // store.dispatch({ type: 'heal' });

  // store.dispatch({ type: HEAL });

  const healAction = heal(200);
  store.dispatch(healAction);
});

// This will be done in componentWillUnmount
// unsubscriber.unsubscribe()

// dispatch actions
