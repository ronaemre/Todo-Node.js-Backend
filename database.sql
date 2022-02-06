CREATE DATABASE databasetodo;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  todoname VARCHAR(255),
  tododate VARCHAR(255),
  todoupdatedate VARCHAR(255)
  todochecked BOOLEAN,
  
);