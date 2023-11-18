import { Controller } from "@hotwired/stimulus";
import { DirectUpload } from "https://cdn.skypack.dev/@rails/activestorage";

export default class extends Controller {
  static targets = ["input", "image"];

  connect() {}

  changed() {
    Array.from(this.inputTarget.files).forEach((file) => {
      const upload = new DirectUpload(file, this.postURL());
      upload.create((error, blob) => {
        this.hiddenInput().value = blob.signed_id;
        this.imageTarget.src = `${this.getURL()}/${blob.signed_id}/${
          blob.filename
        }`;
      });
    });

    this.imageTarget.style.visibility = "visible";
  }

  hiddenInput() {
    if (this._hiddenInput == undefined) {
      this._hiddenInput = document.createElement("input");
      this._hiddenInput.id = "hiddenImageUpload";
      this._hiddenInput.name = this.inputTarget.name;
      this._hiddenInput.type = "hidden";
      this.inputTarget.parentNode.insertBefore(
        this._hiddenInput,
        this.inputTarget.nextSibling
      );
    }
    return this._hiddenInput;
  }

  postURL() {
    return "/rails/active_storage/direct_uploads";
  }

  getURL() {
    return "/rails/active_storage/blobs/redirect";
  }
}
