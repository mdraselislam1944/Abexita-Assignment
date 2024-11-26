Here is the complete README file for your NestJS project based on the provided code and structure:

````markdown
# Voice Search Project - NestJS

This is a NestJS project that implements a voice search system for doctor information. The application allows users to search for doctors using keywords and perform CRUD operations (Create, Read, Update, Delete) on doctor data.

## Description

The project includes an API that allows users to:

- Add new doctors
- Search for doctors based on keywords
- Update existing doctor information
- Delete doctors from the database

The search functionality utilizes Natural Language Processing (NLP) to process and stem the search keywords.

## Project Setup

Follow these steps to set up and run the project:

### 1. Clone the repository

```bash
$ git clone https://github.com/mdraselislam1944/Abexita-Assignment.git
```
````

### 2. Rename the environment file

Rename `.env.example` to `.env` and update the following values:

- Application port number
- Database username
- Database password

### 3. Install dependencies

```bash
$ pnpm install
```

### 4. Set up the database

Run the Prisma migration to set up the database schema:

```bash
$ pnpm npx prisma migrate dev --name init
```

## Compile and Run the Project

After setting up the project, you can run it in different modes:

### Development Mode

```bash
$ pnpm run start
```

### Watch Mode (Auto-restarts on changes)

```bash
$ pnpm run start:dev
```

### Production Mode

```bash
$ pnpm run start:prod
```

## Run Tests

### Unit Tests

Run unit tests to ensure that your application logic is working as expected:

```bash
$ pnpm run test
```

### End-to-End (E2E) Tests

Run E2E tests to ensure that all parts of the application work together:

```bash
$ pnpm run test:e2e
```

### Test Coverage

Check the test coverage of your application:

```bash
$ pnpm run test:cov
```

## CRUD Operations - Doctor

The `DoctorController` exposes several endpoints for CRUD operations on doctor data.

### Create a Doctor

Create a new doctor in the database. Sample data give on sample-data-.txt this file.

**POST** `/doctor`

**Request Body (JSON)**:

```json
{
  "type": "Organization",
  "orgOrPracticeId": "example-practice-id",
  "usernameOrBusinessUrl": "example.com",
  "name": "Dr. John Doe",
  "ranking": 5,
  "photo": "https://example.com/photo.jpg",
  "category": "Cardiology",
  "subCategory": ["Heart Disease", "Arrhythmia"],
  "rating": 4.5,
  "totalAppointment": 200,
  "zones": ["North Zone", "South Zone"],
  "branches": ["Branch 1", "Branch 2"],
  "areaOfPractice": "Cardiologist"
}
```

**Response**:

```json
{
  "id": 1,
  "type": "Organization",
  "orgOrPracticeId": "example-practice-id",
  "usernameOrBusinessUrl": "example.com",
  "name": "Dr. John Doe",
  "ranking": 5,
  "photo": "https://example.com/photo.jpg",
  "category": "Cardiology",
  "subCategory": ["Heart Disease", "Arrhythmia"],
  "rating": 4.5,
  "totalAppointment": 200,
  "zones": ["North Zone", "South Zone"],
  "branches": ["Branch 1", "Branch 2"],
  "areaOfPractice": "Cardiologist"
}
```

### Find All Doctors

Search for doctors using keywords.

**GET** `/doctor?keywords=Find the best doctor in dhaka`

**Query Parameter**: `keywords` (string) - Space-separated list of search terms.

The API uses NLP to process the keywords, remove stopwords, stem the words, and search across multiple fields including type, name, category, and more.

**Response**:

```json
[
  {
    "id": 1,
    "type": "Organization",
    "orgOrPracticeId": "example-practice-id",
    "usernameOrBusinessUrl": "example.com",
    "name": "Dr. John Doe",
    "ranking": 5,
    "photo": "https://example.com/photo.jpg",
    "category": "Cardiology",
    "subCategory": ["Heart Disease", "Arrhythmia"],
    "rating": 4.5,
    "totalAppointment": 200,
    "zones": ["North Zone", "South Zone"],
    "branches": ["Branch 1", "Branch 2"],
    "areaOfPractice": "Cardiologist"
  }
]
```

### Find Home page show

Search for doctors using keywords.

**GET** `/`

**Query Parameter**: `keywords` (string) - Space-separated list of search terms.

The API uses NLP to process the keywords, remove stopwords, stem the words, and search across multiple fields including type, name, category, and more.

**Response**:

```home page ui show doctor list

```

### Find a Single Doctor

Find a specific doctor by ID.

**GET** `/doctor/:id`

**Response**:

```json
{
  "id": 1,
  "type": "Organization",
  "orgOrPracticeId": "example-practice-id",
  "usernameOrBusinessUrl": "example.com",
  "name": "Dr. John Doe",
  "ranking": 5,
  "photo": "https://example.com/photo.jpg",
  "category": "Cardiology",
  "subCategory": ["Heart Disease", "Arrhythmia"],
  "rating": 4.5,
  "totalAppointment": 200,
  "zones": ["North Zone", "South Zone"],
  "branches": ["Branch 1", "Branch 2"],
  "areaOfPractice": "Cardiologist"
}
```

### Update a Doctor

Update the details of a specific doctor.

**PATCH** `/doctor/:id`

**Request Body (JSON)**:

```json
{
  "name": "Dr. John Smith",
  "rating": 4.8
}
```

**Response**:

```json
{
  "id": 1,
  "type": "Organization",
  "orgOrPracticeId": "example-practice-id",
  "usernameOrBusinessUrl": "example.com",
  "name": "Dr. John Smith",
  "ranking": 5,
  "photo": "https://example.com/photo.jpg",
  "category": "Cardiology",
  "subCategory": ["Heart Disease", "Arrhythmia"],
  "rating": 4.8,
  "totalAppointment": 200,
  "zones": ["North Zone", "South Zone"],
  "branches": ["Branch 1", "Branch 2"],
  "areaOfPractice": "Cardiologist"
}
```

### Delete a Doctor

Delete a specific doctor by ID.

**DELETE** `/doctor/:id`

**Response**:

```json
{
  "message": "Doctor deleted successfully"
}
```

## Database Model

The `Doctor` model used in the database:

```prisma
model Doctor {
  id                Int      @id @default(autoincrement())
  type              String   @default("Organization")
  orgOrPracticeId   String
  usernameOrBusinessUrl String
  name              String
  ranking           Int
  photo             String?
  category          String
  subCategory       String[]
  rating            Float
  totalAppointment  Int
  zones             String[]
  branches          String[]
  areaOfPractice    String
}
```

This defines the structure for storing doctor information, including their name, ranking, category, sub-categories, and other related data.

## Conclusion

This NestJS-based API allows you to manage doctor data efficiently and supports advanced search functionality using NLP techniques for better keyword-based searching. You can perform CRUD operations and search for doctors based on various criteria like name, category, and specialties.

```

### Key Sections Added:
1. **Complete Project Setup**: Instructions for cloning the repo, setting up environment variables, and installing dependencies.
2. **Run Instructions**: How to run the project in different modes (development, production).
3. **CRUD Endpoints**: Full API documentation for the endpoints (`POST`, `GET`, `PATCH`, `DELETE`) with sample request and response.
4. **Database Model**: Details about the Prisma database model for `Doctor`.
```
