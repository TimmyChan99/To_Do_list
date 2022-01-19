import { Task, addTask } from './index.js';

describe('testing add', () => {
  it('adding the first task', () => {
    addTask( 'task 1' );
    expect(this.index).toBe(1);
  });

  it('adding and chacking task description', () => {
    addTask( 'task 2' );
    expect(this.index[1].description).toBe('task 2');
  });
});
