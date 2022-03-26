export class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector, profileAvatarSelector }) {
    this._profileName = profileNameSelector;
    this._profileAbout = profileAboutSelector;
    this._avatar = profileAvatarSelector;
  }

  getUserInfo = () => {

    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
  }

  setUserInfo = (name, about, avatar) => {

    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._avatar.src = avatar;

  }

}
