package sba301.a2trandinhduyphuong_se18d04.configs;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sba301.a2trandinhduyphuong_se18d04.entities.Category;
import sba301.a2trandinhduyphuong_se18d04.entities.SystemAccount;
import sba301.a2trandinhduyphuong_se18d04.entities.Tag;
import sba301.a2trandinhduyphuong_se18d04.entities.enumerations.CategoryStatus;
import sba301.a2trandinhduyphuong_se18d04.repositories.AccountRepository;
import sba301.a2trandinhduyphuong_se18d04.repositories.CategoryRepository;
import sba301.a2trandinhduyphuong_se18d04.repositories.TagRepository;

@Configuration
public class DataInitConfig {

    @Bean
    public CommandLineRunner initData(AccountRepository accountRepository,
            CategoryRepository categoryRepository,
            TagRepository tagRepository) {
        return args -> {
            if (!accountRepository.existsByAccountEmail("admin@fpt.edu.vn")) {
                SystemAccount admin = new SystemAccount();
                admin.setAccountName("Admin");
                admin.setAccountEmail("admin@fpt.edu.vn");
                admin.setAccountPassword("admin123");
                admin.setAccountRole(1); // Admin
                accountRepository.save(admin);
                System.out.println("Created default admin account: admin@fpt.edu.vn / admin123");
            }

            if (!accountRepository.existsByAccountEmail("staff@fpt.edu.vn")) {
                SystemAccount staff = new SystemAccount();
                staff.setAccountName("Staff User");
                staff.setAccountEmail("staff@fpt.edu.vn");
                staff.setAccountPassword("staff123");
                staff.setAccountRole(2); // Staff
                accountRepository.save(staff);
                System.out.println("Created default staff account: staff@fpt.edu.vn / staff123");
            }

            if (!categoryRepository.existsByCategoryName("Technology")) {
                Category tech = new Category();
                tech.setCategoryName("Technology");
                tech.setCategoryDescription("Technology and IT news");
                tech.setIsActive(CategoryStatus.ACTIVE);
                categoryRepository.save(tech);
            }

            if (!categoryRepository.existsByCategoryName("Education")) {
                Category edu = new Category();
                edu.setCategoryName("Education");
                edu.setCategoryDescription("Education and learning news");
                edu.setIsActive(CategoryStatus.ACTIVE);
                categoryRepository.save(edu);
            }

            if (!categoryRepository.existsByCategoryName("Events")) {
                Category events = new Category();
                events.setCategoryName("Events");
                events.setCategoryDescription("University events and activities");
                events.setIsActive(CategoryStatus.ACTIVE);
                categoryRepository.save(events);
            }

            if (!tagRepository.existsByTagName("Featured")) {
                Tag featured = new Tag();
                featured.setTagName("Featured");
                featured.setNote("Featured articles");
                tagRepository.save(featured);
            }

            if (!tagRepository.existsByTagName("Breaking")) {
                Tag breaking = new Tag();
                breaking.setTagName("Breaking");
                breaking.setNote("Breaking news");
                tagRepository.save(breaking);
            }

            if (!tagRepository.existsByTagName("Important")) {
                Tag important = new Tag();
                important.setTagName("Important");
                important.setNote("Important announcements");
                tagRepository.save(important);
            }

            System.out.println("Data initialization completed!");
        };
    }

}
