<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## nestjs-pow-mvp — швидкий старт

Це невеликий NestJS проєкт з PoW-модулем (proof-of-work), MongoDB і Redis, налаштований для локальної розробки з Docker Compose.

Коротко

- PoW модуль у `src/modules/pow` — генерує challenge і перевіряє рішення.
- Audit модуль з Mongoose schema зберігає лог запитів.
- Redis використовується через `ioredis` і глобальний `RedisModule`.

Швидкий старт (локально)

1. Встановіть залежності:

```powershell
pnpm install
```

2. Запустіть у режимі розробки:

```powershell
pnpm run start:dev
```

API документація (Swagger): http://localhost:4000/docs

Запуск з Docker Compose

1. Переконайтесь, що Docker Desktop запущено.
2. Побудуйте образи і підніміть стек:

```powershell
docker compose build --no-cache
docker compose up -d
```

3. Перевірте логи:

```powershell
docker compose logs mongo --tail=200
docker compose logs redis --tail=200
docker compose logs app --tail=200
```

Змінні оточення

- Основні змінні лежать у `.env`:
  - MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_INITDB_DATABASE
  - REDIS_HOST, REDIS_PORT
  - MONGO_URI / MONGO_URL (якщо хочете передати готовий рядок підключення)

Локальна розробка vs Docker

- Якщо запускаєте додаток локально (pnpm start:dev), встановіть `REDIS_HOST=127.0.0.1` (або підключіться до локального Redis).
- Якщо запускаєте через Docker Compose, `REDIS_HOST=redis` працюватиме всередині контейнера.

Поширені проблеми

- getaddrinfo ENOTFOUND redis — додаток не може знайти хост `redis` (зазвичай коли ви запускаєте додаток локально). Встановіть `REDIS_HOST=127.0.0.1` або запустіть Redis у Docker.
- Mongo authentication error (command insert requires authentication) — переконайтесь, що `MONGO_URI` або `MONGO_INITDB_ROOT_*` збігаються з тими, що були використані під час першої ініціалізації тома. Щоб перініціалізувати Mongo з новими creds (DEV only):

```powershell
docker compose down -v
docker compose up -d
```

Проєкт — PoC / MVP; використовуйте як стартову базу для розробки.
