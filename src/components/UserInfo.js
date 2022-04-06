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

  setUserInfo = ({ name, about, avatar, _id }) => {

    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;

  }
}
