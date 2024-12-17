package enit.webserver.parkingApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ParkingAppApplication implements WebMvcConfigurer{

	public static void main(String[] args) {
		SpringApplication.run(ParkingAppApplication.class, args);
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// Autoriser CORS pour toutes les routes sous /api/
		registry.addMapping("/api/**")
				.allowedOrigins("http://localhost:4200")
				.allowedMethods("GET", "POST", "PUT", "DELETE")
				.allowCredentials(true)
				.allowedHeaders("*");
	}

}
