package sba301.a2trandinhduyphuong_se18d04.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sba301.a2trandinhduyphuong_se18d04.dtos.request.TagRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.ApiResponse;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.TagResponse;
import sba301.a2trandinhduyphuong_se18d04.services.TagService;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TagController {

    private final TagService tagService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TagResponse>>> getAllTags() {
        List<TagResponse> tags = tagService.getAllTags();
        return ResponseEntity.ok(ApiResponse.success(tags));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TagResponse>> getTagById(@PathVariable Long id) {
        try {
            TagResponse tag = tagService.getTagById(id);
            return ResponseEntity.ok(ApiResponse.success(tag));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TagResponse>> createTag(@Valid @RequestBody TagRequest request) {
        try {
            TagResponse tag = tagService.createTag(request);
            return ResponseEntity.ok(ApiResponse.success("Tag created successfully", tag));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TagResponse>> updateTag(
            @PathVariable Long id,
            @Valid @RequestBody TagRequest request) {
        try {
            TagResponse tag = tagService.updateTag(id, request);
            return ResponseEntity.ok(ApiResponse.success("Tag updated successfully", tag));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTag(@PathVariable Long id) {
        try {
            tagService.deleteTag(id);
            return ResponseEntity.ok(ApiResponse.success("Tag deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<TagResponse>>> searchTags(@RequestParam String keyword) {
        List<TagResponse> tags = tagService.searchTags(keyword);
        return ResponseEntity.ok(ApiResponse.success(tags));
    }

}
