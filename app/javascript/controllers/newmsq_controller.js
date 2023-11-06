import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="newmsq"
export default class extends Controller {
  connect() {}

  reset() {
    this.element.reset();
  }
}
