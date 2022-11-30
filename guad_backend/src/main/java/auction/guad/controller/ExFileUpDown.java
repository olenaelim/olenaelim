package auction.guad.controller;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.ApiOperation;

@RestController
public class ExFileUpDown {

    
    @ApiOperation(value = "이미지 업로드")
    @PostMapping("/upload/fileUploadMultiple")
    public String fileUploadMultiple(@RequestParam("uploadFileMulti") ArrayList<MultipartFile> files, Model model) throws IOException {
        String savedFileName = "";
        // 1. 파일 저장 경로 설정 : 실제 서비스되는 위치(프로젝트 외부에 저장)
        String uploadPath = "C:\\Temp\\";
        // 여러 개의 원본 파일을 저장할 리스트 생성
        ArrayList<String> originalFileNameList = new ArrayList<String>();
        for(MultipartFile file : files) {
            // 2. 원본 파일 이름 알아오기
            String originalFileName = file.getOriginalFilename();
            // 3. 파일 이름을 리스트에 추가
            originalFileNameList.add(originalFileName);
            // 4. 파일 이름 중복되지 않게 이름 변경(서버에 저장할 이름) UUID 사용
            UUID uuid = UUID.randomUUID();
            savedFileName = uuid.toString() + "_" + originalFileName;
            // 5. 파일 생성
            File file1 = new File(uploadPath + savedFileName);
            // 6. 서버로 전송
            file.transferTo(file1);
        }
        // model로 저장
        model.addAttribute("originalFileNameList", originalFileNameList);
        return"upload/fileUploadMultipleResult";
    }
    
    /**
	 * @param requestMap
	 * @return Map<String, Object>
	 * @throws SQLException
	 * @description 글 작성
	 */
	
	@PostMapping("WriteBoard.do")
	public  Map<String,Object> WriteBoard (HttpServletRequest request,
			@RequestParam(value="file", required=false) MultipartFile[] files
			,@RequestParam(value="tag", required=false) String tag
            ,@RequestParam(value="comment", required=false) String comment) throws SQLException  {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		String FileNames ="";
		System.out.println("paramMap =>"+files[0]);
		System.out.println("paramMap =>"+tag);
		System.out.println("paramMap =>"+comment);
		String filepath = "C:/cookingapp/churchfront/public/image/saveFolder/";
		   for (MultipartFile mf : files) {
			   
	            String originFileName = mf.getOriginalFilename(); // 원본 파일 명
	            long fileSize = mf.getSize(); // 파일 사이즈

	            System.out.println("originFileName : " + originFileName);
	            System.out.println("fileSize : " + fileSize);

	            String safeFile =System.currentTimeMillis() + originFileName;
	            
	            FileNames = FileNames+","+safeFile; 
	            try {
	            	File f1 = new File(filepath+safeFile);
	                mf.transferTo(f1);
	            } catch (IllegalStateException e) {
	                // TODO Auto-generated catch block
	                e.printStackTrace();
	            } catch (IOException e) {
	                // TODO Auto-generated catch block
	                e.printStackTrace();
	            }
	        }
		Map<String, Object> paramMap = new HashMap<String, Object>();
		FileNames = FileNames.substring(1);
		System.out.println("FileNames =>"+ FileNames);
		paramMap.put("comment", comment);
		paramMap.put("FileNames", FileNames);
		paramMap.put("tag", tag);
		resultMap.put("JavaData", paramMap);
		return resultMap;
	}
}
