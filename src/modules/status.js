export default function UpdateStatus(e, list) {
  const boxId = e.target.id;
  const checkBox = document.querySelector(`#${boxId}`);
  const status = checkBox.checked;
  for (let i = 0; i < list.length; i += 1) {
    const span = document.querySelectorAll('.span')[i];
    if (`box-${list[i].index}` === boxId && status === true) {
      list[i].completed = true;
      span.classList.toggle('done');
    } else if (`box-${list[i].index}` === boxId && status === false) {
      list[i].completed = false;
      span.classList.toggle('done');
    }
  }
}
