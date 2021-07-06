// We'll import our createStore method to actually setup our redux store
import { createStore } from 'redux';

// At the beginning of every redux app, we need to have an initial state.
// This should remind you of how we set state initially in React Class
// Component Constructors! It's the same idea
const initialState = {
  enemyHealth: 1000,
  macHealth: 400,
};

// Action Types -- Just constants!
// They represent a STRING of our action type
const MAC_ATTACKS = 'Mac Attacks';
const TROGDOR_ATTACKS = 'Trogdor Attacks';
const HEAL = 'Heal';

// Action Creator -- a function that returns an ACTION. It may or may not take parameters!

const macAttacks = (damage) => {
  return {
    type: MAC_ATTACKS,
    damage,
  };
};

const trogdorAttacks = (damage) => {
  return {
    type: TROGDOR_ATTACKS,
    damage,
  };
};

const heal = (heal) => {
  return {
    type: HEAL,
    heal,
  };
};

// We want to make sure we create a reducer. This is a javascript function
// that will be used by redux to modify our state. A reducer function takes
// the previous state of the store, and the action happening to the store.
// This will return our newly modified state!

const reducer = (state = initialState, action) => {
  // We use the action type and a switch statement to organize our logic around
  // the possible actions. If none of the actions are found here, we want to just
  // return the state by default
  switch (action.type) {
    case TROGDOR_ATTACKS:
      return { ...state, macHealth: state.macHealth - action.damage };
    case MAC_ATTACKS:
      return { ...state, enemyHealth: state.enemyHealth - action.damage };
    case HEAL:
      return { ...state, macHealth: state.macHealth + action.heal };
    default:
      return state;
  }
};

// This function call is how redux sets up our store
const store = createStore(reducer);

// Well what is it?
console.log(store);

/**
METHODS that exist on the store object
- dispatch - a method that accepts an ACTION as an argument and sends this action to the store's reducer
- subscribe - a method that accepts a callback function that will run every time the store state changes
- getState - a method that returns the current state of the store
 */

// The initial store state
console.log('initial state: ', store.getState());

// Here I am going to set up the DOM elements
const macHealth = document.getElementById('macHealth');
const enemyHealth = document.getElementById('enemyHealth');

// Now we can subscribe to store changes. Think of this as an event listener on the store changes
// It returns a "listener" that can unsubscribe from the store!
const unsubscriber = store.subscribe(() => {
  const state = store.getState();
  macHealth.innerText = state.macHealth;
  enemyHealth.innerText = state.enemyHealth;
});

// Now I need to set up my event handlers for the buttons

document.getElementById('enemyAttack').addEventListener('click', () => {
  console.log('Trogdor Attacks!');
  store.dispatch(trogdorAttacks(100));
  // We should replace our directly used action types with the action creators now!
  // store.dispatch({ type: TROGDOR_ATTACKS, damage: 100 });

  // We should replace our string action types with our variable action types now!
  // store.dispatch({ type: 'trogdor attacks', damage: 100 });
});

document.getElementById('macAttack').addEventListener('click', () => {
  console.log('Mac Attacks!');
  store.dispatch(macAttacks(100));
  // store.dispatch({ type: MAC_ATTACKS, damage: 100 });
  // store.dispatch({ type: 'mac attacks', damage: 100 });
});

document.getElementById('heal').addEventListener('click', () => {
  console.log('Mac Heals!');
  store.dispatch(heal(100));
  // store.dispatch({ type: HEAL, heal: 200 });
  // store.dispatch({ type: 'heal', heal: 200 });
});
