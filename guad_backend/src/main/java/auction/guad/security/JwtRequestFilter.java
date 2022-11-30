package auction.guad.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import auction.guad.service.MemberService;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter{
	
	private JwtTokenUtil jwtTokenUtil;
	private MemberService memberService;
	
	public JwtRequestFilter(JwtTokenUtil jwtTokenUtil, MemberService memberService) {
		this.jwtTokenUtil = jwtTokenUtil;
		this.memberService = memberService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String requestToTokenHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		String subject = null; // email
		String jwtToken = null;
		
		// 요청받은 헤더의 토큰 검증
		if(requestToTokenHeader != null && requestToTokenHeader.startsWith("Bearer ")) {
			// substring(7) : "Bearer " 뺀 문자 가져오기
			jwtToken = requestToTokenHeader.substring(7);
			try {
				subject = jwtTokenUtil.getSubjectFromToken(jwtToken);
			} catch (Exception e) {
				log.error("subject 추출에 실패" + e.getMessage());
			}
		} else {
			log.error("Authorization 헤더 누락 또는 토큰 형식 오류");
		}
		
		// SecurityContextHolder : 서버에서 인증된 정보
		if(subject != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			// 서버의 유저ID(Email)
			UserDetails userDetails = memberService.loadUserByUsername(subject);
			
			if(jwtTokenUtil.validateToken(jwtToken, userDetails)) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
						new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource());
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			} else {
				SecurityContextHolder.getContext().setAuthentication(null);
			}
		} else {
			SecurityContextHolder.getContext().setAuthentication(null);
		}
		filterChain.doFilter(request, response);
	}

	
}
