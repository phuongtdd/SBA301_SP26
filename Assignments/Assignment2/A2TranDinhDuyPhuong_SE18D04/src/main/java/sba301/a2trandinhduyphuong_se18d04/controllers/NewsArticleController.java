package sba301.a2trandinhduyphuong_se18d04.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sba301.a2trandinhduyphuong_se18d04.dtos.request.NewsArticleRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.ApiResponse;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.NewsArticleResponse;
import sba301.a2trandinhduyphuong_se18d04.services.NewsArticleService;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NewsArticleController {

    private final NewsArticleService newsArticleService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<NewsArticleResponse>>> getAllNewsArticles() {
        List<NewsArticleResponse> articles = newsArticleService.getAllNewsArticles();
        return ResponseEntity.ok(ApiResponse.success(articles));
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<NewsArticleResponse>>> getActiveNewsArticles() {
        List<NewsArticleResponse> articles = newsArticleService.getActiveNewsArticles();
        return ResponseEntity.ok(ApiResponse.success(articles));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<NewsArticleResponse>> getNewsArticleById(@PathVariable Long id) {
        try {
            NewsArticleResponse article = newsArticleService.getNewsArticleById(id);
            return ResponseEntity.ok(ApiResponse.success(article));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<NewsArticleResponse>> createNewsArticle(
            @Valid @RequestBody NewsArticleRequest request,
            @RequestHeader(value = "X-Account-Id", required = false, defaultValue = "1") Long accountId) {
        try {
            NewsArticleResponse article = newsArticleService.createNewsArticle(request, accountId);
            return ResponseEntity.ok(ApiResponse.success("News article created successfully", article));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<NewsArticleResponse>> updateNewsArticle(
            @PathVariable Long id,
            @Valid @RequestBody NewsArticleRequest request,
            @RequestHeader(value = "X-Account-Id", required = false, defaultValue = "1") Long accountId) {
        try {
            NewsArticleResponse article = newsArticleService.updateNewsArticle(id, request, accountId);
            return ResponseEntity.ok(ApiResponse.success("News article updated successfully", article));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteNewsArticle(@PathVariable Long id) {
        try {
            newsArticleService.deleteNewsArticle(id);
            return ResponseEntity.ok(ApiResponse.success("News article deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<NewsArticleResponse>>> searchNewsArticles(@RequestParam String keyword) {
        List<NewsArticleResponse> articles = newsArticleService.searchNewsArticles(keyword);
        return ResponseEntity.ok(ApiResponse.success(articles));
    }

    @GetMapping("/creator/{accountId}")
    public ResponseEntity<ApiResponse<List<NewsArticleResponse>>> getNewsArticlesByCreator(
            @PathVariable Long accountId) {
        List<NewsArticleResponse> articles = newsArticleService.getNewsArticlesByCreator(accountId);
        return ResponseEntity.ok(ApiResponse.success(articles));
    }

}
