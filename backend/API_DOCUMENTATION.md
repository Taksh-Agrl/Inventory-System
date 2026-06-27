# Inventory API Documentation

Base URL: `http://localhost:5000/api`

All protected routes accept the JWT from the `token` HttpOnly cookie. JSON responses use `{ "success": true, "data": ... }` or `{ "success": false, "message": ... }`.

## Auth

- `POST /auth/register` creates a user. Body: `name`, `email`, `password`, optional `role`.
- `POST /auth/login` authenticates and sets the cookie. Body: `email`, `password`.
- `POST /auth/logout` clears the cookie.
- `GET /auth/me` returns the current user.

## Products

- `GET /products` supports `page`, `limit`, `search`, `category`, `sortBy`, `sortOrder`.
- `POST /products` admin-only product creation. Accepts JSON or multipart with `image`.
- `GET /products/:id` returns one product.
- `PUT /products/:id` admin-only update.
- `DELETE /products/:id` admin-only delete.

## Stocks

- `POST /stocks/movement` changes stock. Body: `productId`, `quantity`, `movementType` (`ADD` or `REMOVE`), `note`.
- `POST /stocks/adjust` sets absolute stock. Body: `productId`, `newQuantity`, `note`.
- `GET /history` lists stock audit rows with optional `productId` and `movementType`.

## Orders

- `GET /orders` supports `page`, `limit`, `search`, `status`.
- `POST /orders` creates an order and deducts stock inside a Prisma transaction.
- `GET /orders/:id` returns one order.
- `PUT /orders/:id` updates editable order metadata.
- `POST /orders/:id/cancel` cancels the order and restores stock inside a Prisma transaction.

## Dashboard

- `GET /dashboard` returns summary cards, recent orders, recent stock activity, and chart data.
