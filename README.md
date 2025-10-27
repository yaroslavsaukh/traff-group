# Proof-of-Work Authentication API

Цей проєкт реалізує систему **Proof-of-Work (PoW)** для захисту API від ботів і надмірних запитів.  
Механізм PoW змушує клієнта виконати невелику обчислювальну задачу перед доступом до сервісу.

---

## 🚀 Технології

- **Node.js + Fastify** — високопродуктивний сервер
- **Redis** — зберігання PoW-челенджів і тайм-аутів
- **TypeScript** — типобезпечна логіка
- **Swagger (Fastify Swagger UI)** — документація API

---

## ⚙️ Встановлення

```bash
git clone https://github.com/your-repo/pow-api.git
cd pow-api
npm install
```

---

## ▶️ Запуск

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

---

## 🧩 Маршрути

### 1. `POST /pow/challenge`

Створює новий PoW-челендж для клієнта.

#### Request

```json
{
  "clientId": "client_123",
  "difficulty": 4
}
```

#### Response

```json
{
  "challenge": "fa2b6d3e7a91c5",
  "difficulty": 4
}
```

---

### 2. `POST /pow/verify`

Перевіряє правильність розв’язку задачі.

#### Request

```json
{
  "clientId": "client_123",
  "challenge": "fa2b6d3e7a91c5",
  "nonce": 25791,
  "hash": "000fe3adbcf4e89..."
}
```

#### Response

```json
{ "valid": true }
```

Якщо рішення невірне або прострочене:

```json
{ "valid": false }
```

---

### 3. `GET /protected`

Захищений ендпоінт, доступний лише після успішної перевірки PoW.

#### Headers

```
x-client-id: client_123
x-pow-hash: 000fe3adbcf4e89...
x-pow-nonce: 25791
```

#### Response

```json
{ "message": "Access granted to protected resource" }
```

---

## Як це працює

1. Клієнт запитує челендж (`/pow/challenge`).
2. Сервер генерує випадковий рядок і складність (кількість нулів на початку хешу).
3. Клієнт підбирає **nonce**, щоб `SHA256(challenge + nonce)` починався з потрібної кількості нулів.
4. Клієнт надсилає результат на `/pow/verify`.
5. Сервер перевіряє хеш і при успіху видає доступ до `/protected`.

---

## 🧠 Приклад клієнтського рішення на JS

```js
import crypto from 'crypto';

function findNonce(challenge, difficulty) {
  let nonce = 0;
  const prefix = '0'.repeat(difficulty);
  while (true) {
    const hash = crypto
      .createHash('sha256')
      .update(challenge + nonce)
      .digest('hex');
    if (hash.startsWith(prefix)) {
      return { nonce, hash };
    }
    nonce++;
  }
}
```

---

## Swagger-документація

Swagger доступний за адресою:

```
http://localhost:4000/docs
```

---

## Автор

**Ярослав Саух**  
Backend Developer (NestJS, Node.js, Fastify, GraphQL, Prisma)
