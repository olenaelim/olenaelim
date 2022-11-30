package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.ReviewDto;

@Mapper
public interface ReviewMapper {

 List<ReviewDto> selectReviewListByEmail(String email) throws Exception;
 int insertReview(ReviewDto reviewDto) throws Exception;
 void updateReview(ReviewDto reviewDto) throws Exception;
 void deleteReview(int reviewNum) throws Exception;
	
}
