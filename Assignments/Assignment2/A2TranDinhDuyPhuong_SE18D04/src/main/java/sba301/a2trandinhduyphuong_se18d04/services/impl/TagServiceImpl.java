package sba301.a2trandinhduyphuong_se18d04.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sba301.a2trandinhduyphuong_se18d04.dtos.request.TagRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.TagResponse;
import sba301.a2trandinhduyphuong_se18d04.entities.Tag;
import sba301.a2trandinhduyphuong_se18d04.repositories.TagRepository;
import sba301.a2trandinhduyphuong_se18d04.services.TagService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public List<TagResponse> getAllTags() {
        return tagRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TagResponse getTagById(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
        return mapToResponse(tag);
    }

    @Override
    public TagResponse createTag(TagRequest request) {
        Tag tag = new Tag();
        tag.setTagName(request.getTagName());
        tag.setNote(request.getNote());

        Tag saved = tagRepository.save(tag);
        return mapToResponse(saved);
    }

    @Override
    public TagResponse updateTag(Long id, TagRequest request) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));

        tag.setTagName(request.getTagName());
        tag.setNote(request.getNote());

        Tag saved = tagRepository.save(tag);
        return mapToResponse(saved);
    }

    @Override
    public void deleteTag(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + id));
        tagRepository.delete(tag);
    }

    @Override
    public List<TagResponse> searchTags(String keyword) {
        return tagRepository.searchByKeyword(keyword).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private TagResponse mapToResponse(Tag tag) {
        return TagResponse.builder()
                .tagId(tag.getTagId())
                .tagName(tag.getTagName())
                .note(tag.getNote())
                .build();
    }

}
