export function render(component: string): HTMLElement {
  const div = document.createElement("div");
  div.innerHTML = component;
  const container = document.body.appendChild(div);
  return container;
}

export function cleanup() {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
}
