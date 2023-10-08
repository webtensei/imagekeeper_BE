# ImageKeeper BACKEND
HOSTED: https://imagekeeper.webtensei.ru/api (no swagger) </br>
FRONTEND: https://github.com/webtensei/imagekeeper_FE


## Запуск
`npm i` && `npm run dev`

## Настройка
* создать .env в корне (возможно не удалю его)
* Настроить переменные:
  * PORT: порт старта сервера (example: 5000)
  * DB_URL: mongodb ссылка для коннекта
  * API_URL: урл апишки (example: http://localhost:5000)
  * CLIENT_URL: урл клиента (example: http://localhost:5001)

## TODO
* auth middleware. Если на ручку апи /images пост накинуть без author, то multer сохранит картинку, а бд дропнет ошибку
* реализовать dto, не отдавать ip на клиент
* вытащить конфиг multer из роутера


