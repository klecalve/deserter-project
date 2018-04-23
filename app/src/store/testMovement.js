/*
 * Import
 */
// import axios from 'axios';
import { moveRight, moveLeft, moveUp, moveDown } from 'src/store/movement';
/*
 * Code
 */

const TEST_MOVE_RIGHT = 'TEST_MOVE_RIGHT';
const TEST_MOVE_LEFT = 'TEST_MOVE_LEFT';
const TEST_MOVE_UP = 'TEST_MOVE_UP';
const TEST_MOVE_DOWN = 'TEST_MOVE_DOWN';
/*
 * Middleware
 */
export default store => next => (action) => {
  // Code
  switch (action.type) {
    case TEST_MOVE_RIGHT: {
      store.dispatch(moveRight(store.getState().map.level1));
      break;
    }
    case TEST_MOVE_LEFT: {
      store.dispatch(moveLeft(store.getState().map.level1));
      break;
    }
    case TEST_MOVE_UP: {
      store.dispatch(moveUp(store.getState().map.level1));
      break;
    }
    case TEST_MOVE_DOWN: {
      store.dispatch(moveDown(store.getState().map.level1));
      break;
    }
    default:
  }
  // On passe au voisin
  next(action);
};


// console.log(store.getState());
export const testMoveRight = () => ({
  type: TEST_MOVE_RIGHT,
});

export const testMoveLeft = () => ({
  type: TEST_MOVE_LEFT,
});

export const testMoveUp = () => ({
  type: TEST_MOVE_UP,
});

export const testMoveDown = () => ({
  type: TEST_MOVE_DOWN,
});