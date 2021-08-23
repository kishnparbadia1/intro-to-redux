// Eventually I need to end up with a store

/**
 * What are the actions in my app?
 *
 * Trogdor Attacks
 * Mac Attacks
 * Mac Heals
 *
 */

/**
 * action structure
 * {
 *  whatTheActionDoes
 *  type: TrogdorAttacks/MacAttacks/MacHeals
 * }
 */

// First thing's first, let's create action types
// Action types --- they're just strings
const TROGDOR_ATTACKS = 1;
const MAC_ATTACKS = 2;
const MAC_HEALS = 3;

// Second thing's second, let's create action creators
// Action creators --- They will take in a value and return an action

// How it will be used
// store.dispatch(trogdorAttacks(100));

const trogdorAttacks = (damage) => {
  const criticalChance = Math.random() * 100;
  if (criticalChance > 85) {
    damage = damage * 2;
  }
  if (criticalChance < 15) {
    damage = 0;
  }
  return {
    type: TROGDOR_ATTACKS,
    damage,
  };
};

const macAttacks = (damage) => {
  return {
    type: MAC_ATTACKS,
    damage,
  };
};

const macHeals = (heal) => {
  return {
    type: MAC_HEALS,
    heal,
  };
};

import { createStore } from 'redux';

// We want to ensure we have an initialState, so the first load can still do something
const initialState = {
  macHealth: 400,
  enemyHealth: 1000,
};
const reducer = (currentState = initialState, action) => {
  console.log('currentState', currentState);
  console.log('action', action);
  switch (action.type) {
    case TROGDOR_ATTACKS:
      // console.log({ ...currentState });
      let health = currentState.macHealth - action.damage;
      if (health <= 0) {
        health = 0;
      }
      return {
        // trogdorHealth: currentState.trogdorHealth,
        // Keep all the current state
        ...currentState,
        // Modify the macHealth with the action damage
        macHealth: health,
      };
    case MAC_ATTACKS:
      return {
        ...currentState,
        enemyHealth: currentState.enemyHealth - action.damage,
      };
    case MAC_HEALS:
      return {
        ...currentState,
        macHealth: currentState.macHealth + action.heal,
      };
    default:
      return currentState;
  }
};

const store = createStore(reducer);

console.log('store', store);

/**
 * Store has 3 major methods that we want to use
 *  - dispatch - Allow us to tell the store / reducer that an action has happened to change state
 *  - getState - Allows us to retrieve the state at this current time (snapshot)
 *  - subscribe - Allows us to continually listen for state changes
 */

const macHealth = document.getElementById('macHealth');
const enemyHealth = document.getElementById('enemyHealth');
// In react, we will import the store and subscribe in componentDidMount
store.subscribe(() => {
  const state = store.getState();
  console.log('state from subscribe', state);
  if (state.macHealth <= 0) {
    alert('MAC DIED');
  }
  if (state.enemyHealth <= 0) {
    alert('KILLED TROGDOR');
  }
  macHealth.innerText = state.macHealth;
  enemyHealth.innerText = state.enemyHealth;
});

document.getElementById('enemyAttack').addEventListener('click', () => {
  console.log('Enemy Attacks!');
  // const attackAction = trogdorAttacks(100);
  // store.dispatch(attackAction);
  // More likely to see it this way, although it is the same as the above two lines
  store.dispatch(trogdorAttacks(100));
  // store.dispatch({
  //   type: TROGDOR_ATTACKS,
  //   damage: 100,
  // });
  // store.dispatch({
  //   type: 'Trogdor Attacks',
  //   damage: 100,
  // });
});

document.getElementById('macAttack').addEventListener('click', () => {
  console.log('MAC ATTACKS');
  store.dispatch(macAttacks(250));
});

document.getElementById('heal').addEventListener('click', () => {
  console.log('MAC HEALS');
  store.dispatch(macHeals(200));
});
