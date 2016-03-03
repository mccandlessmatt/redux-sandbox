import expect from 'expect'
import reducer from '../src/js/reducers/taskReducer'
import deepFreeze from 'deep-freeze'

const initState = deepFreeze({});

const passedState = deepFreeze({
    id: 123,
    name: 'task 1',
    color: 'rgb(125,125,125)',
    editable: false
});

const editAction = {
  type: 'EDIT_TASK',
  id: 123
}

const completeEditAction = {
  type: 'COMPLETE_EDIT_TASK',
  id: 123
}

const updateAction = {
  type: 'UPDATE_TASK',
  id: 123,
  update: {
    name: 'task updated',
    color:'rgb(0,0,0,)'
  }
}

describe('Task Reducer', () => {
  it('Passing no parameters should return default state', () => {
    expect(reducer()).toEqual(initState);
  });

  it('Passing state with no action should return state', () => {
    expect(reducer(passedState)).toEqual(passedState);
  });

  it('Passing no state with known action shouldn\'t throw error', () =>{
    expect(() => reducer(undefined, {type: 'ADD_TASK'})).toNotThrow();
  });

  it('Adding task should return new task', () => {
    expect(reducer(undefined, {type: 'ADD_TASK', ...passedState})).toEqual(passedState)
  });

  it('Edit Task should return task with editable enabled when id\'s match', () => {
    expect(reducer(passedState, editAction)).toEqual({...passedState, editable: true});
    expect(reducer(passedState, {...editAction, id:456})).toEqual(passedState);
  });

  it('Update Task should return task with updates if ids match', () => {
    expect(reducer(passedState, updateAction)).toEqual({...passedState, ...updateAction.update});
    expect(reducer(passedState, {...updateAction, id:456})).toEqual(passedState);
  });

  it('Complete Edit should return task with editable set to false if ids match', () => {
    const editableState = {
      ...passedState,
      editable: false
    }

    expect(reducer(editableState, completeEditAction)).toEqual(passedState);
    expect(reducer(editableState, {...completeEditAction, id:456})).toEqual(editableState);
  })
});
