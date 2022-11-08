### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

Удалить зависимость
`lerna exec "yarn remove dep" --scope=xxx`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`


### Deploy heroku

#### CLIENT
```
heroku git:remote -a chicago-client


heroku login
heroku container:login
heroku container:push web --arg SCOPE=client
heroku container:release web
```

Доп. информацию по деплою можно найти здесь https://dashboard.heroku.com/apps/chicago-client/deploy/heroku-container

#### SERVER

```
heroku git:remote -a chicago-api
```

```
heroku login
heroku container:login
heroku container:push web --arg SCOPE=server
heroku container:release web
```

Доп. информацию по деплою можно найти здесь https://dashboard.heroku.com/apps/chicago-api/deploy/heroku-container

### Restart heroku app

Для сервера

```
heroku restart -a chicago-api
```

Для клиента

```
heroku restart -a chicago-client
```


## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)
