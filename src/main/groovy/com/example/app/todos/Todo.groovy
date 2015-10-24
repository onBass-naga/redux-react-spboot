package com.example.app.todos

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

/**
 * Created by naga on 15/09/23.
 */
@Entity
@Table(name = "todos")
class Todo implements Serializable {

    static final long serialVersionUID = 1L

    @Id
    @GeneratedValue
    Long id

    @NotNull
    @Size(min = 1, max = 20)
    @Column(nullable = false)
    String task

    @NotNull
    @Column(nullable = false)
    Boolean completed

}
