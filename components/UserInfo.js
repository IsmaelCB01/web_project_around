export default class UserInfo {
  constructor({ nameSelector, workSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._workElement = document.querySelector(workSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      work: this._workElement.textContent,
    };
  }

  setUserInfo({ name, work }) {
    this._nameElement.textContent = name;
    this._workElement.textContent = work;
  }
}
