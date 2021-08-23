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

// This will be in your app/store/store.js

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

// This will typically be in /app/components/Game.js(x)

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

class Game extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   enemyHealth: initialState.enemyHealth,
  //   //   macHealth: initialState.macHealth,
  //   // };
  //   // this.enemyAttacks = this.enemyAttacks.bind(this);
  //   // this.iAttack = this.iAttack.bind(this);
  //   // this.iHeal = this.iHeal.bind(this);
  // }

  // componentDidMount() {
  //   this.storeSubscribe = store.subscribe(() => {
  //     this.setState({
  //       ...store.getState(),
  //     });
  //   });
  // }

  // componentWillUnmount() {
  //   // unsubscribe from the store
  //   this.storeSubscribe();
  // }

  // enemyAttacks() {
  //   store.dispatch(trogdorAttacks(100));
  // }

  // iAttack() {
  //   store.dispatch(macAttacks(100));
  // }

  // iHeal() {
  //   store.dispatch(macHeals(100));
  // }

  render() {
    return (
      <div className='play-area'>
        <span className='character-area'>
          <h1>Trogdor</h1>
          <h2>
            Health: <span>{this.props.enemyHealth}</span>
          </h2>
          {/* <button onClick={this.enemyAttacks}>Attack</button> */}
          <button onClick={this.props.enemyAttacks}>Attack</button>
          <img src='./trogdor.png' />
        </span>
        <span className='character-area'>
          <h1>Mac</h1>
          <h2>
            Health: <span>{this.props.macHealth}</span>
          </h2>
          <button onClick={() => this.props.iAttack(100)}>Attack</button>
          <button onClick={() => this.props.iHeal(100)}>Heal</button>
          <img src='./mac.png' />
        </span>
      </div>
    );
  }
}

// this is what the react-redux library does for us.
// store.subscribe(() => {
//   const state = store.getState();
//   const props = component.mapStateToProps(state);
//    component.props = {...props}
// })

// Takes our store state and puts pieces of it on component props
const mapStateToProps = (state) => {
  /**
   * my props:
   * {
   *  macHealth: synchronized to my store state health
   *  enemyHealth: synchronized to my store state enemy health
   * }
   *
   * I can access these in my component with
   *  this.props.macHealth
   *  this.props.enemyHealth
   */
  return {
    // whateverKey: 'something random',
    macHealth: state.macHealth,
    enemyHealth: state.enemyHealth,
  };
};
// Here, we are going to create methods for our component to call to dispatch actions to the store
const mapDispatchToProps = (dispatch) => {
  return {
    enemyAttacks: () => dispatch(trogdorAttacks(100)),
    iAttack: (damage) => dispatch(macAttacks(damage)),
    iHeal: (heal) => dispatch(macHeals(heal)),
  };
};

// This "connect" function is going to link our redux store to our component
// export default connect(mapStateToProps, mapDispatchToProps)(Game);
const ConnectedGame = connect(mapStateToProps, mapDispatchToProps)(Game);


// This will typically be in /app/index.js

// We need a Provider component from 'react-redux' that takes in our store as a property. This component basically signals that our app is ready to connect React Components to our Redux store
ReactDOM.render(
  <Provider store={store}>
    <ConnectedGame />
  </Provider>,
  document.getElementById('app')
);

// This is the old garbage way :vomit:

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
