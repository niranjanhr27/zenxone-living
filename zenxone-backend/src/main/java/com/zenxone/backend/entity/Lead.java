package com.zenxone.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "leads")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String leadName;

    private String parentName;

    @Column(nullable = false)
    private String phone;

    private String email;

    private String college;

    private String course;

    @Column(precision = 10, scale = 2)
    private BigDecimal budget;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    private Property property;

    @Enumerated(EnumType.STRING)
    private LeadSource leadSource;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "executive_id")
    private User executive;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private LeadStatus status = LeadStatus.NEW;

    @Column(length = 1000)
    private String remarks;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum LeadSource {
        WEBSITE,
        WALK_IN,
        REFERRAL,
        SOCIAL_MEDIA,
        COLLEGE_CAMPAIGN,
        AUTO_DRIVER,
        OTHER
    }

    public enum LeadStatus {
        NEW,
        INTERESTED,
        VISIT_SCHEDULED,
        BOOKED,
        REJECTED,
        LOST
    }
}