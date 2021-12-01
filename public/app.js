import React from 'react';
import { connect } from 'react-redux';
import {
  macAttacksAction,
  macHealsAction,
  trogdorAttacksAction
} from './store';
const App = (props) => {
  return (
    <div className="play-area">
      <span className="character-area" id="enemy">
        <h1>Trogdor</h1>
        <h2>Health: <span id="enemyHealth">{props.trogdorHealth}</span></h2>

        {/* !!!!!!!!!!!!!!!!!!!!!!BIG NO!!!!!!!!!!!!!!!!!! */}
        {/* <button id="enemyAttack" onClick={this.trogdorAttacks()}>Attack</button> */}


        {/* These are equivalent */}
        <button id="enemyAttack" onClick={() => props.trogdorAttacks(100)}>Attack</button>
        {/* <button id="enemyAttack" onClick={(event) => this.trogdorAttacks(event,param1, param2)}>Attack</button> */}

        <img src="./trogdor.png" />
      </span>
      <span className="character-area" id="mac">
        <h1>Mac</h1>
        <h2>Health: <span id="macHealth">{props.macHealth}</span></h2>
        <button id="macAttack" onClick={() => props.macAttacks(250)}>Attack</button>
        <button id="heal"onClick={() => props.macHeals(200)}>Heal</button>
        <img src="./mac.png" />
      </span>
    </div>
  )
}

// Connect takes two arguments.

// The first argument is called mapStateToProps
// mapStateToProps gives you the store's state and lets you map it to the component props
const mapStateToProps = (storeState) => {
  console.log('inside mapStateToProps', storeState);
  return {
    trogdorHealth: storeState.trogdorHealth,
    macHealth: storeState.macHealth
  }
}
// The second argument is called mapDispatchToProps
// mapDispatchToProps gives you the dispatch method and lets you use it on your props
const mapDispatchToProps = (dispatch) => {
  console.log('inside mapDispatchToProps');
  return {
    trogdorAttacks: (damage) => dispatch(trogdorAttacksAction(damage)),
    macAttacks: (damage) => dispatch(macAttacksAction(damage)),
    macHeals: (heal) => dispatch(macHealsAction(heal))
  }
}

// it returns a function that wants your Component to be connected
// the returned function returns a connected component
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

// These are totally viable
// const ConnectedApp = connect(mapStateToProps, null)(App)
// const ConnectedApp = connect(null, mapDispatchToProps)(App)

export default ConnectedApp;
