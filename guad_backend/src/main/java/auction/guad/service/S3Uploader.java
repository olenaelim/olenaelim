//package auction.guad.service;
//
//import java.io.File;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//import com.amazonaws.services.s3.AmazonS3Client;
//import com.amazonaws.services.s3.model.CannedAccessControlList;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
//@Component
//@Service
//public class S3Uploader {
//	
//	private AmazonS3Client amazonS3Client;
//
//	@Autowired
//	public S3Uploader(AmazonS3Client amazonS3Client) {
//		this.amazonS3Client = amazonS3Client;
//	}
//	
//	@Value("${cloud.aws.s3.bucket}")
//	private String bucket;
//	
////	public String upload(MultipartFile multipartFile, String dirString) throws IOException{
////		File uploadFile = convert(multipartFile)
////						.orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
////		return upload(uploadFile, dirString);
////	}
////	
//    public String upload(File uploadFile, String filepath, String fileName) {
//        String fullFileName = filepath + fileName;
////        String uploadImageUrl = putS3(uploadFile, fullFileName);
//        String uploadImageUrl = putS3(uploadFile, fileName);
//
//        removeNewFile(uploadFile);  // 로컬에 생성된 File 삭제 (MultipartFile -> File 전환 하며 로컬에 파일 생성됨)
//
//        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
//    }
//    
//    public String putS3(File uploadFile, String fileName) {
//        amazonS3Client.putObject(
//                new PutObjectRequest(bucket, fileName, uploadFile)
//                        .withCannedAcl(CannedAccessControlList.PublicRead)	// PublicRead 권한으로 업로드 됨
//        );
//        return amazonS3Client.getUrl(bucket, fileName).toString();
//    }
//
//    public void removeNewFile(File targetFile) {
//        if(targetFile.delete()) {
//            log.info("파일이 삭제되었습니다.");
//        }else {
//            log.info("파일이 삭제되지 못했습니다.");
//        }
//    }
//
////    private Optional<File> convert(MultipartFile file) throws  IOException {
////        File convertFile = new File(file.getOriginalFilename());
////        if(convertFile.createNewFile()) {
////            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
////                fos.write(file.getBytes());
////            }
////            return Optional.of(convertFile);
////        }
////        return Optional.empty();
////    }
//}
