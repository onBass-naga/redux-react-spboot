package com.example.app.todos

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

/**
 * Created by naga on 15/09/23.
 */
@RestController
@RequestMapping(value = "/api/todos")
class TodoController {

    @Autowired
    TodoService todoService;

    @RequestMapping(method = RequestMethod.GET)
    Map<String, List<Todo>> list() {
        def tasks = todoService.findAll()
        ["data": tasks]
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    Map<String, Todo> getCustomer(@PathVariable Integer id) {
        Todo todo = todoService.findOne(id)
        ["data": todo]
    }

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Todo> postTodo(@RequestBody Todo todo) {
        Todo created = todoService.save(todo)
        return new ResponseEntity<>([data: created], HttpStatus.CREATED)
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    Map<String, Todo> putTodo(@PathVariable Long id, @RequestBody Todo todo) {
        todo.setId(id)
        Todo edited = todoService.update(todo)
        ["data": edited]
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteTodo(@PathVariable Long id) {
        todoService.delete(id)
    }
}
