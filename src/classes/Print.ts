import { HasPrint } from "../interfaces/Types.js";

export class Print implements HasPrint {
  constructor(private element: HTMLDivElement) {}

  print() {
    document.body.innerHTML = this.element.innerHTML;
    window.print();
    document.location.reload();
  }
}
