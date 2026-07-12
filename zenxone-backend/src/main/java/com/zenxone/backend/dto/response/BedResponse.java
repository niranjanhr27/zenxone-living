package com.zenxone.backend.dto.response;

import com.zenxone.backend.entity.Bed;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BedResponse {
    private Long id;
    private Long roomId;
    private String bedNumber;
    private Bed.BedStatus status;
}