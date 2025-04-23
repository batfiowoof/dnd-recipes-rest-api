# DnD Recipes API

REST API сървър за управление на рецепти в стил Dungeons & Dragons. Приложението позволява създаване, преглед, редактиране и изтриване на рецепти, категории и съставки.

## Технологии

### Backend

- Java 21
- Spring Boot 3.2.3
- Spring Data JPA
- Spring Security
- H2 Database
- Cloudinary (за управление на изображения)
- Swagger/OpenAPI (за API документация)
- Lombok
- Maven

### Frontend (React Native)

- React Native
- Expo
- React Navigation
- React Native Paper
- Axios
- Cloudinary React Native SDK

## Функционалности

### Рецепти

- Създаване на нови рецепти
- Преглед на всички рецепти
- Преглед на детайли за конкретна рецепта
- Редактиране на съществуващи рецепти
- Изтриване на рецепти
- Качване на изображения към рецепти

### Категории

- Създаване на нови категории
- Преглед на всички категории
- Редактиране на съществуващи категории
- Изтриване на категории

### Съставки

- Създаване на нови съставки
- Преглед на всички съставки
- Редактиране на съществуващи съставки
- Изтриване на съставки

## Инсталация и стартиране

### Backend

1. Клонирайте репозиторито
2. Отворете проекта в IDE
3. Създайте `.env` файл в коренната директория със следното съдържание:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Стартирайте приложението:
   ```bash
   mvn spring-boot:run
   ```
5. API документацията е достъпна на: `http://localhost:8080/swagger-ui.html`
6. H2 конзолата е достъпна на: `http://localhost:8080/h2-console`

### Frontend

1. Навигирайте до `dnd-recipes-app` директорията
2. Инсталирайте зависимостите:
   ```bash
   npm install
   ```
3. Стартирайте приложението:
   ```bash
   npx expo start
   ```
4. Сканирайте QR кода с Expo Go приложението на вашия мобилен телефон

## API Endpoints

### Рецепти

- `GET /api/recipes` - Връща всички рецепти
- `GET /api/recipes/{id}` - Връща детайли за конкретна рецепта
- `POST /api/recipes` - Създава нова рецепта
- `PUT /api/recipes/{id}` - Редактира съществуваща рецепта
- `DELETE /api/recipes/{id}` - Изтрива рецепта

### Категории

- `GET /api/categories` - Връща всички категории
- `GET /api/categories/{id}` - Връща детайли за конкретна категория
- `POST /api/categories` - Създава нова категория
- `PUT /api/categories/{id}` - Редактира съществуваща категория
- `DELETE /api/categories/{id}` - Изтрива категория

### Съставки

- `GET /api/ingredients` - Връща всички съставки
- `GET /api/ingredients/{id}` - Връща детайли за конкретна съставка
- `POST /api/ingredients` - Създава нова съставка
- `PUT /api/ingredients/{id}` - Редактира съществуваща съставка
- `DELETE /api/ingredients/{id}` - Изтрива съставка

## Структура на проекта

### Backend

```
src/main/java/com/dnd_recipe_api_server/recipes/
├── config/                 # Конфигурационни класове
├── controllers/            # REST контролери
├── dto/                    # Data Transfer Objects
├── entities/               # JPA ентитети
├── repositories/           # JPA репозитории
├── services/               # Бизнес логика
└── utils/                  # Помощни класове
```

### Frontend

```
dnd-recipes-app/
├── app/                    # React Native компоненти
├── components/             # Преизползваеми компоненти
├── hooks/                  # Custom React hooks
├── services/               # API услуги
├── types/                  # TypeScript типове
└── utils/                  # Помощни функции
```

## Сигурност

- CORS конфигурация за защита на API-то
- Валидация на входните данни
- Безопасно съхранение на изображения в Cloudinary
- Защита на Swagger UI и H2 конзолата
