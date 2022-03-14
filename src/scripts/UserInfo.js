import { inputProfileName, inputProfileAbout } from "../utils/constants.js";

export class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {
    this._profileName = profileNameSelector;
    this._profileAbout = profileAboutSelector;
  }

  getUserInfo = () => {

    return {

      name: this._profileName.textContent,
      about: this._profileAbout.textContent

    }
  }

  setUserInfo = () => {

    this._profileName.textContent = inputProfileName.value;
    this._profileAbout.textContent = inputProfileAbout.value;

  }

}
