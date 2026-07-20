FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 9090

ENTRYPOINT ["java","-jar","target/moneymanager-0.0.1-SNAPSHOT.jar"]