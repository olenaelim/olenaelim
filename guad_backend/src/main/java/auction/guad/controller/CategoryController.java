package auction.guad.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.CategoryDto;
import auction.guad.dto.MemberDto;
import auction.guad.service.CategoryService;
import auction.guad.service.CategoryServiceImpl;
import io.swagger.annotations.ApiOperation;

@RestController
public class CategoryController {
	
	private CategoryService categoryService;
	@Autowired
	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	
	@ApiOperation(value = "카테고리 테이블 전체 조회", notes = "카테고리 테이블 전체 조회, 파라미터 : ''")
	@GetMapping("/category")
	public ResponseEntity<ArrayList<CategoryDto>> selectAllCategory() throws Exception{
		System.out.println(categoryService.selectAllCategory());
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.selectAllCategory());
	}
	 
	@ApiOperation(value = "중복없이 대분류만 조회", notes = "중복없이 대분류만 조회, 파라미터 : ''")
	@GetMapping("/category/distinct")
	public ResponseEntity<ArrayList<CategoryDto>> selectItemType() throws Exception{
		System.out.println(categoryService.selectDistinctItemType());
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.selectDistinctItemType());
	}
	
}
