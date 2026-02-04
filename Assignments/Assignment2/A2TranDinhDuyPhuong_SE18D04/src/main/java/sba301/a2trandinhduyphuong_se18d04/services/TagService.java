package sba301.a2trandinhduyphuong_se18d04.services;

import sba301.a2trandinhduyphuong_se18d04.dtos.request.TagRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.TagResponse;

import java.util.List;

public interface TagService {

    List<TagResponse> getAllTags();

    TagResponse getTagById(Long id);

    TagResponse createTag(TagRequest request);

    TagResponse updateTag(Long id, TagRequest request);

    void deleteTag(Long id);

    List<TagResponse> searchTags(String keyword);

}
