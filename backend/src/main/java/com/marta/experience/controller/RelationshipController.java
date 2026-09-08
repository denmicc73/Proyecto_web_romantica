package com.marta.experience.controller;

import com.marta.experience.model.RelationshipConfig;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Endpoint de solo lectura, sin base de datos ni autenticación,
 * pensado para el caso en que en el futuro se quiera dejar de
 * duplicar el contenido en el frontend y servirlo desde aquí.
 * Hoy la experiencia no depende de este endpoint para funcionar.
 */
@RestController
public class RelationshipController {

    @GetMapping("/api/relationship")
    public RelationshipConfig getRelationshipConfig() {
        return new RelationshipConfig(
                "Marta",
                "cosita",
                "2026-06-17T00:00:00+02:00",
                "Quiéreme un poco",
                new RelationshipConfig.Song("Heartbreaker", "Dvalentino"),
                List.of(
                        new RelationshipConfig.TimelineEvent("candela", "01", "Casa de Candela", "Donde nos conocimos."),
                        new RelationshipConfig.TimelineEvent("jerez", "02", "Jerez", "Donde te pedí ser mi novia."),
                        new RelationshipConfig.TimelineEvent("inicio", "03", "17 · 06 · 2026", "El comienzo."),
                        new RelationshipConfig.TimelineEvent("cordoba", "04", "Córdoba", "Nuestro primer viaje solos.")
                )
        );
    }
}
