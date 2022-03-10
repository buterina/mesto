import { inputProfileName, inputProfileAbout, profilePopup } from "../index.js";

export class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {
    this._profileName = profileNameSelector;
    this._profileAbout = profileAboutSelector;
  }

  getUserInfo = () => {

    const user = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    };

    inputProfileName.value = user.name;
    inputProfileAbout.value = user.about;

    return user;
  }


  setUserInfo = () => {

    this._profileName.textContent = inputProfileName.value;
    this._profileAbout.textContent = inputProfileAbout.value;

    profilePopup.close();

  }

}
