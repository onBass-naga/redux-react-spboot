package com.example.app.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration

/**
 * Created by naga on 2015/10/13.
 */
@Configuration
class AppConfig {

    @Value('${spring.profiles.active}')
    String activeProfile

    boolean isDevEnv() {
        activeProfile == 'dev'
    }
}
