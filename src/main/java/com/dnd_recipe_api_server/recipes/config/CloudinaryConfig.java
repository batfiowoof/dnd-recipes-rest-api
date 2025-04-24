package com.dnd_recipe_api_server.recipes.config;

import com.cloudinary.Cloudinary;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Dotenv dotenv = Dotenv.load();
        String cloudinaryUrl = dotenv.get("CLOUDINARY_URL");
        if (cloudinaryUrl == null) {
            throw new IllegalStateException("CLOUDINARY_URL environment variable is not set");
        }
        return new Cloudinary(cloudinaryUrl);
    }
} 