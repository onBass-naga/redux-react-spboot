package com.example.app

import com.example.app.config.AppConfig
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod

/**
 * Created by naga on 15/09/23.
 */
@Controller
@RequestMapping(value = "/")
class ViewController {

    @Autowired
    AppConfig appConfig

    @RequestMapping(method = RequestMethod.GET)
    def index() {
        return "redirect:/todo"
    }

    @RequestMapping(value = "/todo", method = RequestMethod.GET)
    def todo(Model model) {
        model.addAttribute("isDevEnv", appConfig.isDevEnv())
        return "todo/index"
    }
}
