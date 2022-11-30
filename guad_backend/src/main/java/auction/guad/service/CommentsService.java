package auction.guad.service;

import java.util.List;

import auction.guad.dto.CommentsDto;

public interface CommentsService {

	public List<CommentsDto> commentsListByItemNum(int itemNum) throws Exception;
	public int insertComment(CommentsDto commentsDto) throws Exception;
	public CommentsDto selectCommentDetail(int commentNum) throws Exception;
	public void updateComment(CommentsDto commentsDto) throws Exception;
	public void deleteComment(CommentsDto commentsDto) throws Exception;
}
