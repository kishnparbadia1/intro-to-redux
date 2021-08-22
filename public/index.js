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

import React from 'react';
import { Provider, connect } from 'react-redux';
import ReactDOM from 'react-dom';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.enemyAttacks = this.enemyAttacks.bind(this);
    this.iAttack = this.iAttack.bind(this);
    this.iHeal = this.iHeal.bind(this);
  }
  enemyAttacks() {
    this.props.enemyAttacks(100);
  }

  iAttack() {
    this.props.iAttack(100);
  }

  iHeal() {
    this.props.iHeal(100);
  }

  render() {
    return (
      <div className='play-area'>
        <span className='character-area'>
          <h1>Trogdor</h1>
          <h2>
            Health: <span>{this.props.enemyHealth}</span>
          </h2>
          <button onClick={this.enemyAttacks}>Attack</button>
          <img src='./trogdor.png' />
        </span>
        <span className='character-area'>
          <h1>Mac</h1>
          <h2>
            Health: <span>{this.props.macHealth}</span>
          </h2>
          <button onClick={this.iAttack}>Attack</button>
          <button onClick={this.iHeal}>Heal</button>
          <img src='./mac.png' />
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    enemyHealth: state.enemyHealth,
    macHealth: state.macHealth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    enemyAttacks: (damage) => dispatch(trogdorAttacks(damage)),
    iAttack: (damage) => dispatch(macAttacks(damage)),
    iHeal: (health) => dispatch(heal(health)),
  };
};

const ConnectedGame = connect(mapStateToProps, mapDispatchToProps)(Game);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedGame />
  </Provider>,
  document.getElementById('app')
);

/**
METHODS that exist on the store object
- dispatch - a method that accepts an ACTION as an argument and sends this action to the store's reducer
- subscribe - a method that accepts a callback function that will run every time the store state changes
- getState - a method that returns the current state of the store
 */

// The initial store state
// console.log('initial state: ', store.getState());

// // Here I am going to set up the DOM elements
// const macHealth = document.getElementById('macHealth');
// const enemyHealth = document.getElementById('enemyHealth');

// // Now we can subscribe to store changes. Think of this as an event listener on the store changes
// // It returns a "listener" that can unsubscribe from the store!
// const unsubscriber = store.subscribe(() => {
//   const state = store.getState();
//   macHealth.innerText = state.macHealth;
//   enemyHealth.innerText = state.enemyHealth;
// });

// // Now I need to set up my event handlers for the buttons

// document.getElementById('enemyAttack').addEventListener('click', () => {
//   console.log('Trogdor Attacks!');
//   store.dispatch(trogdorAttacks(100));
//   // We should replace our directly used action types with the action creators now!
//   // store.dispatch({ type: TROGDOR_ATTACKS, damage: 100 });

//   // We should replace our string action types with our variable action types now!
//   // store.dispatch({ type: 'trogdor attacks', damage: 100 });
// });

// document.getElementById('macAttack').addEventListener('click', () => {
//   console.log('Mac Attacks!');
//   store.dispatch(macAttacks(100));
//   // store.dispatch({ type: MAC_ATTACKS, damage: 100 });
//   // store.dispatch({ type: 'mac attacks', damage: 100 });
// });

// document.getElementById('heal').addEventListener('click', () => {
//   console.log('Mac Heals!');
//   store.dispatch(heal(100));
//   // store.dispatch({ type: HEAL, heal: 200 });
//   // store.dispatch({ type: 'heal', heal: 200 });
// });

