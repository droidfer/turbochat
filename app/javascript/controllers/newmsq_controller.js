import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["image"];

  connect() {
    this.imageTarget.style.visibility = "hidden";
  }

  reset() {
    this.element.reset;
    this.imageTarget.setAttribute("src", "");
    this.imageTarget.style.visibility = "hidden";
  }
}
