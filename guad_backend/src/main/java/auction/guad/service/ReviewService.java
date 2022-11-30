package auction.guad.service;

import java.util.List;

import auction.guad.dto.ReviewDto;

public interface ReviewService {

	public List<ReviewDto> selectReviewListByEmail(String email) throws Exception;
	public int insertReview(ReviewDto reviewDto) throws Exception;
	public void updateReview(ReviewDto reviewDto) throws Exception;
	public void deleteReview(int reviewNum) throws Exception;
}
