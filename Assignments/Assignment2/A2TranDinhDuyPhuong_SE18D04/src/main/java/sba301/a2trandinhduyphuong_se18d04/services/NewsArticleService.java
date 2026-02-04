package sba301.a2trandinhduyphuong_se18d04.services;

import sba301.a2trandinhduyphuong_se18d04.dtos.request.NewsArticleRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.NewsArticleResponse;

import java.util.List;

public interface NewsArticleService {

    List<NewsArticleResponse> getAllNewsArticles();

    List<NewsArticleResponse> getActiveNewsArticles();

    NewsArticleResponse getNewsArticleById(Long id);

    NewsArticleResponse createNewsArticle(NewsArticleRequest request, Long createdById);

    NewsArticleResponse updateNewsArticle(Long id, NewsArticleRequest request, Long updatedById);

    void deleteNewsArticle(Long id);

    List<NewsArticleResponse> searchNewsArticles(String keyword);

    List<NewsArticleResponse> getNewsArticlesByCreator(Long accountId);

}
