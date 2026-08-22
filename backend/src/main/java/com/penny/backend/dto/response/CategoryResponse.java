package com.penny.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse {

    private Long id;
    private String name;
    private String description;
    private Boolean isActive;
    private Boolean isSystemDefault;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
