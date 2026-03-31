export function clearDOM() {
  document.body.innerHTML = '';
}

export function createTestElement(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  return $(div);
}
