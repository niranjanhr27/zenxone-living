package com.zenxone.backend.controller;

import com.zenxone.backend.dto.response.ApiResponse;

import com.zenxone.backend.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {

	private final FileStorageService fileStorageService;

	@org.springframework.beans.factory.annotation.Value("${file.upload-dir}")
	private String uploadDir;

	@PostMapping(value = "/upload/aadhaar", consumes = "multipart/form-data")
	public ResponseEntity<ApiResponse<Map<String, String>>> uploadAadhaar(@RequestParam("file") MultipartFile file) {
		String fileUrl = fileStorageService.storeFile(file, "aadhaar");
		return ResponseEntity.ok(ApiResponse.success("Aadhaar uploaded successfully", Map.of("fileUrl", fileUrl)));
	}

	@PostMapping(value = "/upload/photo", consumes = "multipart/form-data")
	public ResponseEntity<ApiResponse<Map<String, String>>> uploadPhoto(@RequestParam("file") MultipartFile file) {
		String fileUrl = fileStorageService.storeFile(file, "photos");
		return ResponseEntity.ok(ApiResponse.success("Photo uploaded successfully", Map.of("fileUrl", fileUrl)));
	}

	@GetMapping("/{subFolder}/{fileName:.+}")
	public ResponseEntity<Resource> serveFile(@PathVariable String subFolder, @PathVariable String fileName)
			throws MalformedURLException {
		Path filePath = Paths.get(uploadDir, subFolder).resolve(fileName).normalize();
		Resource resource = new UrlResource(filePath.toUri());

		if (!resource.exists() || !resource.isReadable()) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
}