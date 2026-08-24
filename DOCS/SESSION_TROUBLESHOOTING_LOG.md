# 🛠️ Penny — Project Troubleshooting & Setup Log

Yeh document aaj ke complete session ka step-by-step troubleshooting aur problem-solving summary hai. Isme local setup se lekar cloud deployment (Render, Supabase, Vercel) tak aayi saari problems aur unke exact solutions detailed hain.

---

## 📑 Index

1. [Problem 1: PowerShell Statement Separator (`&&`) Error](#1-powershell-statement-separator--error)
2. [Problem 2: 70+ Compilation Errors (Lombok Annotation Processor Missing)](#2-70-compilation-errors-lombok-annotation-processor-missing)
3. [Problem 3: `Fatal error: TypeTag :: UNKNOWN` (JDK 25 vs JDK 21 Incompatibility)](#3-fatal-error-typetag--unknown-jdk-25-vs-jdk-21-incompatibility)
4. [Problem 4: Local Database Connection Failure (`Hibernate Dialect / JDBC metadata`)](#4-local-database-connection-failure-hibernate-dialect--jdbc-metadata)
5. [Problem 5: Supabase Connection Pooler URL Format Issue on Render](#5-supabase-connection-pooler-url-format-issue-on-render)
6. [Problem 6: Render Server Port Conflict](#6-render-server-port-conflict)
7. [Problem 7: Supabase PgBouncer Transaction Abort & `bad SQL grammar []` Error](#7-supabase-pgbouncer-transaction-abort--bad-sql-grammar--error)
8. [Problem 8: Vercel SPA Routing 404 Error on Refresh (`/expenses`, `/categories`)](#8-vercel-spa-routing-404-error-on-refresh-expenses-categories)

---

## 1. PowerShell Statement Separator (`&&`) Error

### 🔴 Problem
Command prompt style `&&` chaining Windows PowerShell (default versions) mein parse nahi hota:
```powershell
cd frontend && npm install && npm run dev
# Error: The token '&&' is not a valid statement separator in this version.
```

### 🟢 Solution
- Commands ko separate lines mein run kiya ya `;` (semicolon) use kiya:
```powershell
cd frontend; npm install; npm run dev
```

---

## 2. 70+ Compilation Errors (Lombok Annotation Processor Missing)

### 🔴 Problem
`mvn clean install` run karne par 72 errors aaye:
```
[ERROR] CategoryController.java:[20,35] variable categoryService not initialized in default constructor
[ERROR] CategoryMapper.java:[14,24] cannot find symbol method builder()
[ERROR] CategoryMapper.java:[15,30] cannot find symbol method getName()
```
**Kyun hua:** Java 21 compiler annotation processing ke time Lombok ke generated getters, setters aur builders ko build classpath mein nahi dhundh pa raha tha.

### 🟢 Solution
`backend/pom.xml` mein Lombok dependency specify ki aur `maven-compiler-plugin` mein `<annotationProcessorPaths>` add kiya:

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.36</version>
    <scope>provided</scope>
</dependency>

<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.11.0</version>
    <configuration>
        <source>21</source>
        <target>21</target>
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>1.18.36</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

---

## 3. `Fatal error: TypeTag :: UNKNOWN` (JDK 25 vs JDK 21 Incompatibility)

### 🔴 Problem
```
[ERROR] Fatal error compiling: java.lang.ExceptionInInitializerError: com.sun.tools.javac.code.TypeTag :: UNKNOWN
```
**Kyun hua:** System mein JDK 25 installed tha aur Maven default me JDK 25 pick kar raha tha (`Java version: 25.0.1`). Lombok 1.18.36 abhi JDK 25 ke internal javac classes ko support nahi karta.

### 🟢 Solution
Maven ko explicitly system mein installed **JDK 21** (`C:\Program Files\Java\jdk-21`) point karwaya:
```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-21"
$env:PATH="C:\Program Files\Java\jdk-21\bin;$env:PATH"
mvn clean package -DskipTests
```
Result: **`BUILD SUCCESS`** 🎉

---

## 4. Local Database Connection Failure (`Hibernate Dialect / JDBC metadata`)

### 🔴 Problem
```
Unable to determine Dialect without JDBC metadata (please set 'jakarta.persistence.jdbc.url')
```
**Kyun hua:** Local PostgreSQL service pe `pennydb` database create nahi tha aur backend default password `password` use kar raha tha jabki user ka local password `1234` tha.

### 🟢 Solution
1. Local PostgreSQL me database create kiya:
   ```sql
   CREATE DATABASE pennydb;
   ```
2. Sahi credentials ke saath backend launch kiya:
   ```powershell
   & "C:\Program Files\Java\jdk-21\bin\java.exe" -jar "F:\penny\backend\target\backend-1.0.0-SNAPSHOT.jar" --spring.datasource.url=jdbc:postgresql://localhost:5432/pennydb --spring.datasource.username=postgres --spring.datasource.password=1234
   ```
3. Future convenience ke liye one-click startup script **[`start-local.ps1`](file:///f:/penny/start-local.ps1)** create kiya.

---

## 5. Supabase Connection Pooler URL Format Issue on Render

### 🔴 Problem
Render pe deploy karte waqt connection error:
```
UnknownHostException: host=aws-0-ap-southeast-1.pooler.supabase.com
PSQLException: The connection attempt failed.
```
**Kyun hua:**
- URL mein literal string `host=` paste ho gaya tha.
- Pooler port `:6543` missing tha.
- Supabase Pooler ka username project reference (`postgres.ouorqhwjhhlckxgerwtk`) ke saath hota hai.

### 🟢 Solution
Render Environment Variables ko sahi format mein set kiya:
- **`SPRING_DATASOURCE_URL`**: `jdbc:postgresql://aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?sslmode=require`
- **`SPRING_DATASOURCE_USERNAME`**: `postgres.ouorqhwjhhlckxgerwtk`
- **`SPRING_DATASOURCE_PASSWORD`**: `<Supabase_Password>`

---

## 6. Render Server Port Conflict

### 🔴 Problem
Render dynamic port assign karta hai (via `$PORT`), lekin properties mein port `8080` hardcoded tha, jisse Render service healthcheck timeout ho raha tha.

### 🟢 Solution
`backend/src/main/resources/application.properties` mein port configuration update kiya:
```properties
server.port=${PORT:${SERVER_PORT:8080}}
```

---

## 7. Supabase PgBouncer Transaction Abort & `bad SQL grammar []` Error

### 🔴 Problem
Jab user tab switch karta tha (Dashboard ↔ Expense ↔ Category) ya page refresh karta tha:
```
JDBC exception executing SQL [select coalesce(sum(e1_0.amount),0) from expense e1_0] 
[ERROR: current transaction is aborted, commands ignored until end of transaction block]
Unable to commit against JDBC Connection; bad SQL grammar []
```
**Kyun hua:** Supabase Transaction Pooler (PgBouncer) transaction-level pooling use karta hai. Isme:
- Prepared Statement caching crash ho jaata hai jab multiple queries execute hoti hain.
- Hibernate ka `ddl-auto=update` fail hota hai.
- `open-in-view` open connection rakhne ki koshish karta hai jo PgBouncer kill kar deta hai.

### 🟢 Solution
1. **Supabase SQL Editor** mein tables explicitly create kiye:
   ```sql
   CREATE TABLE IF NOT EXISTS category (
       id BIGSERIAL PRIMARY KEY,
       name VARCHAR(50) NOT NULL UNIQUE,
       description VARCHAR(200),
       is_active BOOLEAN DEFAULT TRUE NOT NULL,
       is_system_default BOOLEAN DEFAULT FALSE NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
   );

   CREATE TABLE IF NOT EXISTS expense (
       id BIGSERIAL PRIMARY KEY,
       title VARCHAR(150) NOT NULL,
       amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
       category_id BIGINT NOT NULL REFERENCES category(id) ON DELETE RESTRICT,
       expense_date DATE NOT NULL,
       description VARCHAR(500),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
   );
   ```
2. `application.properties` mein PgBouncer specific configurations add kiye:
   ```properties
   spring.jpa.hibernate.ddl-auto=none
   spring.jpa.open-in-view=false
   
   # HikariCP & PgBouncer tuning
   spring.datasource.hikari.connection-timeout=30000
   spring.datasource.hikari.maximum-pool-size=5
   spring.datasource.hikari.minimum-idle=2
   spring.datasource.hikari.idle-timeout=10000
   spring.datasource.hikari.max-lifetime=60000
   spring.datasource.hikari.data-source-properties.prepareThreshold=0
   spring.datasource.hikari.data-source-properties.preparedStatementCacheQueries=0
   spring.datasource.hikari.data-source-properties.preparedStatementCacheSizeMiB=0
   ```

---

## 8. Vercel SPA Routing 404 Error on Refresh (`/expenses`, `/categories`)

### 🔴 Problem
Vercel pe deployed React app mein `/expenses` ya `/categories` route pe browser refresh karne par error:
```
404: NOT_FOUND
Code: NOT_FOUND
ID: bom1::858kh-1787591312482-3b0766db282a
```
**Kyun hua:** React Router client-side routing karta hai. Vercel server `/expenses` naam ka physical static HTML file dhundhta hai jo exist nahi karta.

### 🟢 Solution
`frontend/vercel.json` aur root `vercel.json` create kiya jisme SPA fallback rewrite rule define kiya:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
Isse Vercel sabhi incoming requests ko `index.html` pe rewrite karta hai aur React Router seamless page transition handle karta hai.

---

## 🎯 Final Project Architecture Summary

| Component | Platform / Tech | Config Highlights |
|---|---|---|
| **Frontend** | React + Vite on **Vercel** | `vercel.json` SPA rewrites, `VITE_API_BASE_URL` mapped to Render API |
| **Backend** | Spring Boot 3.2.3 (Java 21) on **Render** | Maven Lombok processor, `${PORT}` binding, HikariCP tuned |
| **Database** | PostgreSQL on **Supabase** | Transaction Pooler (port `6543`), `prepareThreshold=0`, DDL handled via SQL scripts |
| **Local Runner**| PowerShell (`start-local.ps1`) | Runs both backend & frontend concurrently with local Postgres |
