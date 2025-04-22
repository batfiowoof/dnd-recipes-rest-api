# 🧙 D&D Recipe API Server & Mobile APP

Spring Boot REST API за магически рецепти, използвани в Dungeons & Dragons стил. Включва поддръжка за качване на изображения чрез Cloudinary и работа с категорийна и рецептурна логика.

---

## ⚙️ Технологии

- Java 21
- Spring Boot 3
- Spring Web, Spring Data JPA
- H2 (file mode)
- Lombok
- Cloudinary (за изображения)
- Maven
- React Native
- Expo

---

## 📺 Demo iOS

https://private-user-images.githubusercontent.com/51147711/436124294-20702c2f-f125-4bd4-a2bd-20256d556e22.MOV?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDUzMzI4NTYsIm5iZiI6MTc0NTMzMjU1NiwicGF0aCI6Ii81MTE0NzcxMS80MzYxMjQyOTQtMjA3MDJjMmYtZjEyNS00YmQ0LWEyYmQtMjAyNTZkNTU2ZTIyLk1PVj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA0MjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNDIyVDE0MzU1NlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTE5Y2RlOTE4M2Q0M2EyMmQ1YmY1OTU2ZjE5YTNmNDI4MWZjNjJiMmE4NWFlNDEzY2RlY2ZjYWE3MGIwMzJhNDgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.GvK3m0yFoKw3Xdcx-LSw7R9mhNJdqzJcIEgdJLXfxHI

---

## 🗃️ Структура на проекта

```
src/
└── main/
    └── java/
        └── com/dnd_recipe_api_server/recipes/
            ├── controllers/        # REST контролери
            ├── entities/           # JPA ентитети
            ├── enums/              # Енуми
            ├── exceptions/         # Обработка на грешки
            ├── dto/                # Data Transfer обекти
            ├── mappers/            # DTO - Entity
            ├── repositories/       # Spring Data JPA репозитории
            ├── services/           # Сървиси с бизнес логика
            └── RecipesApplication  # Главен клас
```

---

## 🚀 Стартиране на проекта

1. Клонирай проекта
2. Създай `.env` файл в root директорията и добави:

```env
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
```

3. Стартирай проекта:
```bash
mvn spring-boot:run
```

---

## 📦 REST API Endpoints

### 📄 Recipes

| Method | Endpoint                 | Описание                        |
|--------|--------------------------|---------------------------------|
| GET    | `/api/recipes`           | Връща всички рецепти            |
| GET    | `/api/recipes/{id}`      | Връща рецепта по ID             |
| POST   | `/api/recipes`           | Създава нова рецепта            |
| POST   | `/api/recipes/{id}/image`| Качва изображение за рецепта    |

### 🖼 Пример за качване на снимка:
- `POST /api/recipes/1/image`
- Content-Type: `multipart/form-data`
- Поле: `file` → избери `.jpg`, `.png`

### ⚙️ При създаването на рецепта има опция с и без изображение.

Съответно има ендпоинтове с CRUD за Ingredients и Categories.

---

## 💾 База данни

Проектът използва **H2 в persistent режим** – запазва данните в `./data/recipes.mv.db`.

```properties
spring.datasource.url=jdbc:h2:file:./recipes
spring.jpa.hibernate.ddl-auto=update
```

---

## 🔒 Обработка на грешки

Централизиран `@RestControllerAdvice` глобално прихваща всички custom exception-и и връща ясно структуриран JSON:

```json
{
  "message": "Recipe not found",
  "status": 404,
  "timestamp": "2025-04-17T15:44:23.741"
}
```

Още exception-и могат да се добавят през Enum-ите.

---

## 📸 Cloudinary

Изображенията се качват в Cloudinary чрез Java SDK и се свързват с рецепта чрез `imageUrl`:

```json
{
  "imageUrl": "https://res.cloudinary.com/<cloud>/image/upload/v1234/filename.jpg"
}
```

---

## 🧪 Postman пример

1. `POST /api/recipes`
```json
{
  "name": "Goblin Stew",
  "description": "Spicy and cursed.",
  "instructions": "Boil it until it screams.",
  "difficulty": "HARD",
  "category": {
    "id": 1
}
  "ingredients": [
    { "id": 1}
]
}
```

2. `POST /api/recipes/1/image`
- form-data → key: `file`, value: `image file`

---

## 🐉 Автор

Проект за мобилно приложение – backend част.  
Изграден с магия, много кофеин и малко помощ от ChatGPT.
