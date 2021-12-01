import store, {
  macAttacksAction,
  macHealsAction,
  trogdorAttacksAction
} from './store';

const trogdorHealth = document.getElementById('enemyHealth');
const macHealth = document.getElementById('macHealth');

// This callback function gets called whenever the state changes (the reducer returns)
store.subscribe(() => {
  console.log('The state has changed');
  const state = store.getState();
  trogdorHealth.innerText = state.trogdorHealth;
  macHealth.innerText = state.macHealth;
})

const trogdorAttacks = document.getElementById('enemyAttack');
const macAttacks = document.getElementById('macAttack');
const macHeals = document.getElementById('heal');

trogdorAttacks.addEventListener('click', () => {
  console.log('Trogdor has attacked');
  // store.dispatch(
  //   {
  //     type: TROGDOR_ATTACKS,
  //     damage: 100
  //   }
  // )
  const action = trogdorAttacksAction(100);
  store.dispatch(action)
  // store.dispatch(trogdorAttacksAction(100))
})

macAttacks.addEventListener('click', () => {
  console.log('Mac has attacked');
  // store.dispatch(
  //   {
  //     type: MAC_ATTACKS,
  //     damage: 250
  //   }
  // )
  store.dispatch(macAttacksAction(250))
})

macHeals.addEventListener('click', () => {
  console.log('Mac has healed');
  // store.dispatch(
  //   {
  //     type: MAC_HEALS,
  //     heal: 200
  //   }
  // )
  store.dispatch(macHealsAction(200));
})
