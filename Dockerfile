# Build stage for backend
FROM maven:3.8.4-openjdk-17 AS backend-build
WORKDIR /app
COPY backend/pom.xml .
COPY backend/src ./src
# COPY backend/.mvn ./mvn
RUN mvn clean package -DskipTests -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true

# Build stage for frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Final stage
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy backend JAR
COPY --from=backend-build /app/target/*.jar app.jar

# Copy frontend build
COPY --from=frontend-build /app/build /app/frontend

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=prod
ENV PORT=8080

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"] 