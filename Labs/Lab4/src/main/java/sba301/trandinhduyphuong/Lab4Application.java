package sba301.trandinhduyphuong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"sba301.trandinhduyphuong.controllers", "sba301.trandinhduyphuong.services", "sba301.trandinhduyphuong.repositories"})
public class Lab4Application {

    public static void main(String[] args) {
        SpringApplication.run(Lab4Application.class, args);
    }

}
