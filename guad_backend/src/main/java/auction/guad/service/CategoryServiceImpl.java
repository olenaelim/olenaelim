package auction.guad.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.dto.CategoryDto;
import auction.guad.mapper.CategoryMapper;

@Service
public class CategoryServiceImpl implements CategoryService{

	private CategoryMapper categoryMapper;
	@Autowired	
	public CategoryServiceImpl(CategoryMapper categoryMapper) {
		this.categoryMapper = categoryMapper;
	}

	//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
	@Override
	public ArrayList<CategoryDto> selectAllCategory() throws Exception {
		return categoryMapper.selectAllCategory();
	}

	@Override
	public ArrayList<CategoryDto> selectDistinctItemType() throws Exception {
		return categoryMapper.selectDistinctItemType();
	}

}
