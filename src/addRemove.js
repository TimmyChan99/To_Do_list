function addTask(arr, obj) {
  return arr.push(obj);
}

function removeTask(arr, index) {
  arr.splice(index, 1);
  return arr;
}

export { addTask, removeTask };