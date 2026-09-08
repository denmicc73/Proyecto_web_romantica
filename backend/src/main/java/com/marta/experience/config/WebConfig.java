package com.marta.experience.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Permite que el frontend (desplegado en un dominio distinto, p. ej.
 * un Static Site en Render) pueda llamar a /api/** sin bloqueos de
 * CORS. El origen permitido se configura por variable de entorno
 * para no hardcodear dominios de producción.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.cors.allowed-origin:*}")
    private String allowedOrigin;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigin)
                .allowedMethods("GET")
                .maxAge(3600);
    }
}
