# FILM!

## Установка

### MongoDB

Установите MongoDB скачав дистрибутив с официального сайта или с помощью пакетного менеджера вашей ОС. Также можно воспользоваться Docker (см. ветку `feat/docker`.

Выполните скрипт `test/mongodb_initial_stub.js` в консоли `mongo`.

### Бэкенд

Перейдите в папку с исходным кодом бэкенда

`cd backend`

Установите зависимости (точно такие же, как в package-lock.json) помощью команд

`npm ci` или `yarn install --frozen-lockfile`

Создайте `.env` файл из примера `.env.example`, в нём укажите:

* `DATABASE_DRIVER` - тип драйвера СУБД - в нашем случае это `mongodb` 
* `DATABASE_URL` - адрес СУБД MongoDB, например `mongodb://127.0.0.1:27017/practicum`.  

MongoDB должна быть установлена и запущена.

Запустите бэкенд:

`npm start:debug`

Для проверки отправьте тестовый запрос с помощью Postman или `curl`.


### Ссылки

 - [Фронт-енд часть](http://syallin.students.nomorepartiessbs.ru/)
 - [Бэк-енд часть(список фильмов)](http://syallin.students.nomorepartiessbs.ru/api/afisha/films)
 - [Пример рассписания по фильму](http://syallin.students.nomorepartiessbs.ru/api/afisha/films/51b4bc85-646d-47fc-b988-3e7051a9fe9e/schedule)
 - [Пример статики(картинки)](http://syallin.students.nomorepartiessbs.ru/content/afisha/bg6c.jpg)

### Файлы деплоя

Для деплоя приложения на сервере нужно расположить следующие файлы:
 - [docker-compose.yml](https://github.com/SerYallin/film-react-nest/tree/review-2/docker-compose.yml)
 - [.env файл](https://github.com/SerYallin/film-react-nest/tree/review-2/.env.example) - файл с настройками среды.
 - Папку nginx с [настройками](https://github.com/SerYallin/film-react-nest/tree/review-2/nginx/default.conf) для проксирования бэк-енд путей
 - Папку со статическими [файлами(картинками)](https://github.com/SerYallin/film-react-nest/tree/review-2/backend/public). эта папка должна располагаться в корне деплоя, либо согласно настройке в файле компосера 
````
  app-backend:
    ...
    volumes:
      - ./public://var/www/app/public
````

### Запуск сервера

После того как все подготовлено можно просто выполнить команду: ``docker-compose up -d`` (ключ `-d` - для запуска в фоновом режиме).
Для того чтоб принудительно пересобрать образы, добавить ключ ``--build``:
``docker-compose up -d --build``
Для остановки docker ``docker-compose down``, либо если приостановить без удаления контейнеров: ``docker-compose stop``


