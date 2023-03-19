class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _returnResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //метод для регистрации пользователя
  register(email, password) {
    console.log(email, password); //www.nastya97@yandex.ru 11111
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: `${email}`, password: `${password}` }),
    }).then(this._returnResponse);
  }
}

export const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
});
