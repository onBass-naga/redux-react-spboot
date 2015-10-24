package com.example.app.todos

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Created by naga on 15/09/23.
 */
@Repository
interface TodoRepository extends JpaRepository<Todo, Long> {
}