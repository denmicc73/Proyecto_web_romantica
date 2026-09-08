package com.marta.experience.model;

import java.util.List;

/**
 * Representa el mismo contenido que ya vive en el frontend
 * (src/content/relationship.ts). Hoy el frontend funciona de forma
 * autónoma con su propio contenido embebido; este modelo queda
 * preparado por si en el futuro se prefiere servir el contenido
 * desde el backend en vez de duplicarlo en el cliente.
 */
public record RelationshipConfig(
        String name,
        String nickname,
        String relationshipStartIso,
        String specialPhrase,
        Song song,
        List<TimelineEvent> timeline
) {
    public record Song(String title, String artist) {
    }

    public record TimelineEvent(String id, String index, String title, String caption) {
    }
}
