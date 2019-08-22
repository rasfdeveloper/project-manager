# Project Manager

This application are used for manage projects and tasks

## Routes

- `GET /projects`: Return all projects;

- `POST /projects`: Create one project;
### Request body
```js
[
  {
    id: "1",
    title: 'New Project',
    tasks: []
  }
]
```

 - `PUT /projects/:id`: Change title of the project;
### Request body
```js
{
    title: 'New Project'
}
```
- `DELETE /projects/:id`: Delete one project;

- `POST /projects/:id/task`: Create a new task within the project;
### Request body
```js
{
    title: 'New Task'
}
```