package sba301.a2trandinhduyphuong_se18d04.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sba301.a2trandinhduyphuong_se18d04.dtos.request.NewsArticleRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.NewsArticleResponse;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.TagResponse;
import sba301.a2trandinhduyphuong_se18d04.entities.Category;
import sba301.a2trandinhduyphuong_se18d04.entities.NewsArticle;
import sba301.a2trandinhduyphuong_se18d04.entities.SystemAccount;
import sba301.a2trandinhduyphuong_se18d04.entities.Tag;
import sba301.a2trandinhduyphuong_se18d04.entities.enumerations.NewsStatus;
import sba301.a2trandinhduyphuong_se18d04.repositories.AccountRepository;
import sba301.a2trandinhduyphuong_se18d04.repositories.CategoryRepository;
import sba301.a2trandinhduyphuong_se18d04.repositories.NewsArticleRepository;
import sba301.a2trandinhduyphuong_se18d04.repositories.TagRepository;
import sba301.a2trandinhduyphuong_se18d04.services.NewsArticleService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsArticleServiceImpl implements NewsArticleService {

    private final NewsArticleRepository newsArticleRepository;
    private final CategoryRepository categoryRepository;
    private final AccountRepository accountRepository;
    private final TagRepository tagRepository;

    @Override
    public List<NewsArticleResponse> getAllNewsArticles() {
        return newsArticleRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<NewsArticleResponse> getActiveNewsArticles() {
        return newsArticleRepository.findByNewsStatus(NewsStatus.ACTIVE).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public NewsArticleResponse getNewsArticleById(Long id) {
        NewsArticle article = newsArticleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News article not found with id: " + id));
        return mapToResponse(article);
    }

    @Override
    public NewsArticleResponse createNewsArticle(NewsArticleRequest request, Long createdById) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));

        SystemAccount creator = accountRepository.findById(createdById)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + createdById));

        NewsArticle article = new NewsArticle();
        article.setNewsTitle(request.getNewsTitle());
        article.setHeadline(request.getHeadline());
        article.setNewsContent(request.getNewsContent());
        article.setNewsSource(request.getNewsSource());
        article.setCategory(category);
        article.setNewsStatus(request.getIsActive() ? NewsStatus.ACTIVE : NewsStatus.INACTIVE);
        article.setCreatedBy(creator);
        article.setUpdatedBy(creator);

        // Handle tags
        if (request.getTagIds() != null && !request.getTagIds().isEmpty()) {
            List<Tag> tags = tagRepository.findAllById(request.getTagIds());
            article.setTags(tags);
        } else {
            article.setTags(new ArrayList<>());
        }

        NewsArticle saved = newsArticleRepository.save(article);
        return mapToResponse(saved);
    }

    @Override
    public NewsArticleResponse updateNewsArticle(Long id, NewsArticleRequest request, Long updatedById) {
        NewsArticle article = newsArticleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News article not found with id: " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));

        SystemAccount updater = accountRepository.findById(updatedById)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + updatedById));

        article.setNewsTitle(request.getNewsTitle());
        article.setHeadline(request.getHeadline());
        article.setNewsContent(request.getNewsContent());
        article.setNewsSource(request.getNewsSource());
        article.setCategory(category);
        article.setNewsStatus(request.getIsActive() ? NewsStatus.ACTIVE : NewsStatus.INACTIVE);
        article.setUpdatedBy(updater);

        // Handle tags
        if (request.getTagIds() != null && !request.getTagIds().isEmpty()) {
            List<Tag> tags = tagRepository.findAllById(request.getTagIds());
            article.setTags(tags);
        } else {
            article.setTags(new ArrayList<>());
        }

        NewsArticle saved = newsArticleRepository.save(article);
        return mapToResponse(saved);
    }

    @Override
    public void deleteNewsArticle(Long id) {
        NewsArticle article = newsArticleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News article not found with id: " + id));
        newsArticleRepository.delete(article);
    }

    @Override
    public List<NewsArticleResponse> searchNewsArticles(String keyword) {
        return newsArticleRepository.searchByKeyword(keyword).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<NewsArticleResponse> getNewsArticlesByCreator(Long accountId) {
        return newsArticleRepository.findByCreatedBy_AccountId(accountId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private NewsArticleResponse mapToResponse(NewsArticle article) {
        List<TagResponse> tagResponses = new ArrayList<>();
        if (article.getTags() != null) {
            tagResponses = article.getTags().stream()
                    .map(tag -> TagResponse.builder()
                            .tagId(tag.getTagId())
                            .tagName(tag.getTagName())
                            .note(tag.getNote())
                            .build())
                    .collect(Collectors.toList());
        }

        return NewsArticleResponse.builder()
                .newsArticleId(article.getNewsArticleId())
                .newsTitle(article.getNewsTitle())
                .headline(article.getHeadline())
                .createdDate(article.getCreatedDate())
                .newsContent(article.getNewsContent())
                .newsSource(article.getNewsSource())
                .categoryId(article.getCategory() != null ? article.getCategory().getCategoryId() : null)
                .categoryName(article.getCategory() != null ? article.getCategory().getCategoryName() : null)
                .isActive(article.getNewsStatus() == NewsStatus.ACTIVE)
                .createdById(article.getCreatedBy() != null ? article.getCreatedBy().getAccountId() : null)
                .createdByName(article.getCreatedBy() != null ? article.getCreatedBy().getAccountName() : null)
                .modifiedDate(article.getModifiedDate())
                .tags(tagResponses)
                .build();
    }

}
