import {
  addTask, removeTask, UpdateTask, saveUpdatedTask, UpdateStatus, clearAll,
} from './addRemove.js';

describe('testing add', () => {
  const task = { index: 1 };
  const list = [];
  it('adding the first task', () => {
    addTask(list, task);
    expect(list.length).toBe(1);
  });

  it('adding and chacking task description', () => {
    addTask(list, task);
    expect(list.length).toBe(2);
  });
});

describe('testing delete', () => {
  const deleteIndex = 1;
  const list = [{ index: 1 }];
  const list2 = [{ index: 1 }, { index: 2 }];

  it('test if first element is deleted', () => {
    expect(removeTask(list, deleteIndex).length).toBe(0);
  });

  it('test if first element is deleted', () => {
    expect(removeTask(list2, deleteIndex).length).toBe(1);
  });
});

describe('Testing Clear All Completed', () => {
  const list = [
    {
      description: 'task1',
      completed: true,
      index: 1,
    },
    {
      description: 'task2',
      completed: false,
      index: 2,
    },
  ];

  test('lenght 1 ', () => {
    expect(clearAll(list).length).toBe(1);
  });

  test('lenght 0', () => {
    const list1 = [
      {
        description: 'task1',
        completed: true,
        index: 1,
      }];
    expect(clearAll(list1).length).toBe(0);
  });

  test('index', () => {
    expect(clearAll(list)[0].index).toBe(1);
  });
});
