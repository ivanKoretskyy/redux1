const counter = (state = 0, action) => {
  switch (action.type){
    case 'INCREMENT':
    return state +1;
    case 'DECREMENT':
    return state -1;
    default: 
    return state;
  }
}

var redux = require('redux');
//const store = redux.createStore(counter);




// store.subscribe(() => {
//   console.log(store.getState());
// })

// setTimeout(()=>{
//   store.dispatch({type: 'INCREMENT'});
// },5000);
// setTimeout(()=>{
//   store.dispatch({type: 'INCREMENT'});
// },2000);
// setTimeout(()=>{
//   store.dispatch({type: 'INCREMENT'});
// },3000)

const createStore = (reducer) => {
  let state;
  let listeners = [];
  const getState =() =>  state;
  const dispatch = (action) => {
    state = reducer(state,action);
    //console.log(state);
    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !==listener);
    }
  }

  dispatch({})
  return {getState, dispatch, subscribe};
}

const store = createStore(counter);

const listener1 = ()=> {console.log(store.getState());}
store.subscribe(listener1);
setTimeout(()=>{
  store.dispatch({type: 'INCREMENT'});
},3000)

