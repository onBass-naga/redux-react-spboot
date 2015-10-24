package com.example.app.todos

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

/**
 * Created by naga on 15/09/23.
 */
@Service
class TodoService {

    @Autowired
    TodoRepository todoRepository

    Todo findOne(Long id) {
        todoRepository.findOne(id)
    }

    List<Todo> findAll() {
        todoRepository.findAll()
    }

    Todo save(Todo entity) {
        todoRepository.save(entity)
    }

    Todo update(Todo entity) {
        todoRepository.save(entity)
    }

    void delete(Long id) {
        Todo entity = todoRepository.findOne(id)
        entity && todoRepository.delete(id)
    }

}
    
