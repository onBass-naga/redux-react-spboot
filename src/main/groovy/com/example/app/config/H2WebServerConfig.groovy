package com.example.app.config

import org.h2.tools.Server
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.DependsOn
import org.springframework.context.annotation.Profile

/**
 * Created by naga on 2015/01/31.
 */
@Configuration
@Profile("dev")
class H2WebServerConfig {

    @Bean(name = "h2Server", initMethod = "start", destroyMethod = "stop")
    @DependsOn(value = "h2WebServer")
    Server createTcpServer() {
        Server.createTcpServer("-tcp,-tcpAllowOthers,-tcpPort,9092".split(","))
    }

    // http://localhost:8082/
    @Bean(name = "h2WebServer", initMethod = "start", destroyMethod = "stop")
    Server createWebServer() {
        Server.createWebServer("-web,-webAllowOthers,-webPort,8082".split(","))
    }
}
