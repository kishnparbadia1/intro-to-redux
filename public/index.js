import store from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import ConnectedApp from './app';
// The Provider is actually a React Component. It takes the store as a property.
// As long as you wrap your app in the Provider, the store will be 'connected' to it
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
, document.getElementById('app'))


/**
 *
 *
 *
 */
// const trogdorHealth = document.getElementById('enemyHealth');
// const macHealth = document.getElementById('macHealth');

// // store.subscribe = (callback) => {
// //   // The goal here is to basically set up an event listener for when the state changes

// //   // Take your callback and make an event listener such that when the state changes,
// //   // we call all the callbacks

// //   // I'll grab a way to unsubscribe from that event listener, and return it to you
// // }

// // This callback function gets called whenever the state changes (the reducer returns)
// const unsubscribe = store.subscribe(() => {
//   console.log('The state has changed');
//   const state = store.getState();
//   trogdorHealth.innerText = state.trogdorHealth;
//   macHealth.innerText = state.macHealth;
// })

// unsubscribe();

// const trogdorAttacks = document.getElementById('enemyAttack');
// const macAttacks = document.getElementById('macAttack');
// const macHeals = document.getElementById('heal');

// trogdorAttacks.addEventListener('click', () => {
//   console.log('Trogdor has attacked');
//   // store.dispatch(
//   //   {
//   //     type: TROGDOR_ATTACKS,
//   //     damage: 100
//   //   }
//   // )
//   const action = trogdorAttacksAction(100);
//   store.dispatch(action)
//   // store.dispatch(trogdorAttacksAction(100))
// })

// macAttacks.addEventListener('click', () => {
//   console.log('Mac has attacked');
//   // store.dispatch(
//   //   {
//   //     type: MAC_ATTACKS,
//   //     damage: 250
//   //   }
//   // )
//   store.dispatch(macAttacksAction(250))
// })

// macHeals.addEventListener('click', () => {
//   console.log('Mac has healed');
//   // store.dispatch(
//   //   {
//   //     type: MAC_HEALS,
//   //     heal: 200
//   //   }
//   // )
//   store.dispatch(macHealsAction(200));
// })
