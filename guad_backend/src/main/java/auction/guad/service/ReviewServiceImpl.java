package auction.guad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.dto.ReviewDto;
import auction.guad.mapper.ReviewMapper;

@Service
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private ReviewMapper reviewMapper;

	public List<ReviewDto> selectReviewListByEmail(String email) throws Exception {
		return reviewMapper.selectReviewListByEmail(email);
	}

	@Override
	public int insertReview(ReviewDto reviewDto) throws Exception {
		return reviewMapper.insertReview(reviewDto);
	}

	@Override
	public void updateReview(ReviewDto reviewDto) throws Exception {
		reviewMapper.updateReview(reviewDto);
	}

	@Override
	public void deleteReview(int reviewNum) throws Exception {
		reviewMapper.deleteReview(reviewNum);
	}

}
