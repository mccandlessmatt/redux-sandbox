import expect from 'expect'
import reducer from '../src/js/reducers/timeReducer'
import deepFreeze from 'deep-freeze'

const initState = deepFreeze({
  value: 0,
  label: '0h 0m'
});

describe('Time Reducer', () => {
  it('Passing no arguments should return default state', () => {
    expect(reducer()).toEqual(initState);
  });

  it('Passing state with no action should return state', () => {
    expect(reducer(initState)).toEqual(initState);
  });

  it('Passing unknown action type should return state', () => {
    const expectedState = {
      value: 180,
      label: '3h 0m'
    }

    const unknownAction = {
      type: 'unknown'
    }

    expect(reducer(expectedState, unknownAction)).toEqual(expectedState);
  });

  it('Passing Change Time action with time should update state', () => {
    const knownAction = {
      type: 'CHANGE_TIME',
      time: 135
    };

    const expectedState = {
      value: 135,
      label: '2h 15m'
    }

    expect(reducer(undefined, knownAction)).toEqual(expectedState);
  })
})
