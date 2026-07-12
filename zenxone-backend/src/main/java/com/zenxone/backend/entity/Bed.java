package com.zenxone.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "beds")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bed {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id", nullable = false)
	@JsonBackReference
	private Room room;

	@Column(nullable = false)
	private String bedNumber;

	@Enumerated(EnumType.STRING)
	@Builder.Default
	private BedStatus status = BedStatus.AVAILABLE;

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

	public enum BedStatus {
		AVAILABLE, OCCUPIED, RESERVED, MAINTENANCE
	}
}