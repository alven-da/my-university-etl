# My University - Extract, Transform and Load

A simple representation of ETL where an enrolled student's info will be extracted and then, based on the course, will create a curriculum and load it into a view

## Tech Stack

- NestJS
- NestJS Microservice - RabbitMQ
- PostgreSQL (TBD)

## Design & Architecture

- Two (2) separate services in a monorepo: (1) Producer and (2) Consumer
- Each of microservice is patterned after Hexagonal (or Clean) Architecture
