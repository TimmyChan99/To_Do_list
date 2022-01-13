export default function UpdateStorage(list) {
  localStorage.setItem('ToDoList', JSON.stringify(list));
}