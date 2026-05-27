package com.finled.modules;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.finled")
public class FinLedApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinLedApplication.class, args);
	}

}
