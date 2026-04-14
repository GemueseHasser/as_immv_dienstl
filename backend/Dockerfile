# --- build stage ---
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# dependencies cachen
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline

# source
COPY src ./src

# build (wichtig: clean + package)
RUN mvn -q -DskipTests clean package

# WICHTIG:
# Spring Boot erzeugt oft zwei JARs: original-...jar (NICHT ausführbar) und ...jar (ausführbar)
# Wir kopieren explizit das NICHT-originale JAR und prüfen, dass es ein Boot-Fat-Jar ist (BOOT-INF vorhanden).
RUN set -eux; \
    ls -la target; \
    JAR="$(ls target/*.jar | grep -v 'original-' | head -n 1)"; \
    echo "Using JAR: $JAR"; \
    cp "$JAR" /app/app.jar; \
    jar tf /app/app.jar | grep -q '^BOOT-INF/'

# --- runtime stage ---
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/app.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
