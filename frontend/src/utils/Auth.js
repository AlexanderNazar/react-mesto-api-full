const BASE_URL = 'https://nazarov.back.nomorepartiesxyz.ru';

export function registration(inputValueOject) {
  return fetch(BASE_URL + `/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputValueOject)
  })
    .then(res =>
      {if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    )
}

export function authorization(inputValueOject) {
  return fetch(BASE_URL + `/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputValueOject)
  })
    .then(res =>
      {if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    )
}

export function getContent(token) {
  return fetch(BASE_URL + `/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  })
    .then(res =>
      {if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    )
}
