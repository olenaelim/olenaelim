package auction.guad.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import auction.guad.dto.MemberDto;
import auction.guad.service.MemberService;
import auction.guad.service.MemberServiceImpl;
import auction.guad.vo.RequestVo;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private MemberService memberService;
	private JwtTokenUtil jwtTokenUtil;
	
	public AuthenticationFilter(MemberService memberService, JwtTokenUtil jwtTokenUtil) {
		this.memberService = memberService;
		this.jwtTokenUtil = jwtTokenUtil; 
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println(request + "ㅗㅗㅗㅗㅗ" + response);
		try {
			// 요청(request)에서 인증 처리에 필요한 정보를 추출
			RequestVo creds = new ObjectMapper().readValue(request.getInputStream(), RequestVo.class);
			
			return getAuthenticationManager().authenticate(
				new UsernamePasswordAuthenticationToken(
					creds.getEmail(),
					creds.getPass(), 
					new ArrayList<>()
				)				
			);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	
	
	@Override 
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		System.out.println("<<<<<<<<<<<<<<<<<<<<authResult : " + authResult);
		String username = ((User)authResult.getPrincipal()).getUsername();
		MemberDto member = memberService.loginContainPass(username);
		log.debug(member.toString());
		
		String jwtToken = jwtTokenUtil.generateToken(member);
		System.out.println(jwtToken);
		response.setHeader("token", jwtToken);
		response.getWriter().write(jwtToken);
	}
	
}
