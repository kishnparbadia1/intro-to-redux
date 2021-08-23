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
const TROGDOR_ATTACKS = 'Trogdor Attacks';
const MAC_ATTACKS = 'Mac Attacks';
const MAC_HEALS = 'Mac Heals';

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

import React from 'react';
import ReactDOM from 'react-dom';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enemyHealth: initialState.enemyHealth,
      macHealth: initialState.macHealth,
    };
    this.enemyAttacks = this.enemyAttacks.bind(this);
    this.iAttack = this.iAttack.bind(this);
    this.iHeal = this.iHeal.bind(this);
  }

  componentDidMount() {
    const storeSubscribe = store.subscribe(() => {
      this.setState({
        ...store.getState(),
      });
    });
  }

  enemyAttacks() {
    store.dispatch(trogdorAttacks(100));
  }

  iAttack() {
    store.dispatch(macAttacks(100));
  }

  iHeal() {
    store.dispatch(macHeals(100));
  }

  render() {
    return (
      <div className='play-area'>
        <span className='character-area'>
          <h1>Trogdor</h1>
          <h2>
            Health: <span>{this.state.enemyHealth}</span>
          </h2>
          <button onClick={this.enemyAttacks}>Attack</button>
          <img src='./trogdor.png' />
        </span>
        <span className='character-area'>
          <h1>Mac</h1>
          <h2>
            Health: <span>{this.state.macHealth}</span>
          </h2>
          <button onClick={this.iAttack}>Attack</button>
          <button onClick={this.iHeal}>Heal</button>
          <img src='./mac.png' />
        </span>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('app'));

/**
 * Store has 3 major methods that we want to use
 *  - dispatch - Allow us to tell the store / reducer that an action has happened to change state
 *  - getState - Allows us to retrieve the state at this current time (snapshot)
 *  - subscribe - Allows us to continually listen for state changes
 */

// const macHealth = document.getElementById('macHealth');
// const enemyHealth = document.getElementById('enemyHealth');
// // In react, we will import the store and subscribe in componentDidMount
// store.subscribe(() => {
//   const state = store.getState();
//   console.log('state from subscribe', state);
//   if (state.macHealth <= 0) {
//     alert('MAC DIED');
//   }
//   if (state.enemyHealth <= 0) {
//     alert('KILLED TROGDOR');
//   }
//   macHealth.innerText = state.macHealth;
//   enemyHealth.innerText = state.enemyHealth;
// });

// document.getElementById('enemyAttack').addEventListener('click', () => {
//   console.log('Enemy Attacks!');
//   // const attackAction = trogdorAttacks(100);
//   // store.dispatch(attackAction);
//   // More likely to see it this way, although it is the same as the above two lines
//   store.dispatch(trogdorAttacks(100));
//   // store.dispatch({
//   //   type: TROGDOR_ATTACKS,
//   //   damage: 100,
//   // });
//   // store.dispatch({
//   //   type: 'Trogdor Attacks',
//   //   damage: 100,
//   // });
// });

// document.getElementById('macAttack').addEventListener('click', () => {
//   console.log('MAC ATTACKS');
//   store.dispatch(macAttacks(250));
// });

// document.getElementById('heal').addEventListener('click', () => {
//   console.log('MAC HEALS');
//   store.dispatch(macHeals(200));
// });
