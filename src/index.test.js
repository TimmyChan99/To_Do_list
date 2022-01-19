import { Task, addTask } from './index.js';

const task = new Task();

describe('testing add', () => {
  it('adding the first task', () => {
    addTask({ description: 'task 1' });
    expect(this.index).toBe(1);
  });

  it('adding and chacking task description', () => {
    addTask({ description: 'task 2' });
    expect(this.index[1].description).toBe('task 2');
  });
});
