var redux = require('redux');

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    return {
      id: action.id,
      text: action.text,
      completed: false
    };
    case 'TOGGLE_TODO':
    
      if(state.id !== action.id) {
        return state;
      }
      return {
        id: state.id,
        text: state.text,
        completed: !state.completed
      };
    default:
      return state;
    
  }
}

const todos = (state =[], action) => {
  switch(action.type){
    case'ADD_TODO':
    return [
      ...state,
      todo(undefined, action)
    ];
    case 'TOGGLE_TODO':
    return state.map(t => todo(t,action))
    default:
    return state;
  }
}

const todoApp = (state = {} , action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}

const visibilityFilter = ( state = 'SHOW_ALL', action) => {

  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
    return state;
  }
}


const store = redux.createStore(todoApp);
console.log('initial state');
console.log(store.getState());
console.log('-----------------');

console.log('dispatchint ADD_TODO.');
store.dispatch({type:'ADD_TODO', id: 1, text: 'GO Shoping'});

console.log('current state: ');
console.log(store.getState());
console.log('-----------------');

console.log('dispatchint TOGGLE_TODO.');
store.dispatch({type:'TOGGLE_TODO', id: 1});
console.log('-----------------');

console.log('current state: ');
console.log(store.getState());
console.log('-----------------');

console.log('dispatchint SET_VISIBILITY_FILTER.');
store.dispatch({type:'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED'});
console.log('-----------------');

console.log('current state: ');
console.log(store.getState());
console.log('-----------------');