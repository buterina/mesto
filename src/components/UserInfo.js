export class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
    this._avatar = profileAvatar;
  }

  getUserInfo = () => {

    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
  }

  setUserInfo = (name, about) => {

    this._profileName.textContent = name;
    this._profileAbout.textContent = about;

  }

  setAvatar = (avatar) => {
    this._avatar.src = avatar;

  }

}
