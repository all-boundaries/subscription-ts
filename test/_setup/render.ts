export function render(component: string): HTMLElement {
  const div = document.createElement("div");
  div.innerHTML = component;
  const container = document.body.appendChild(div);
  return container;
}
