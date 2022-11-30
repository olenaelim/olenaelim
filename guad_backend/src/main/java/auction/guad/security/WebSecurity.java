package auction.guad.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import auction.guad.service.MemberService;
import auction.guad.service.MemberServiceImpl;

@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

	// 의존 객체를 생성자를 통해서 주입
	private MemberService memberService;
	private BCryptPasswordEncoder passwordEncoder;
	private JwtTokenUtil jwtTokenUtil;
	private JwtRequestFilter jwtRequestFilter;

	@Autowired
	public WebSecurity(MemberService memberService, BCryptPasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil,
			JwtRequestFilter jwtRequestFilter) {
		this.memberService = memberService;
		this.passwordEncoder = passwordEncoder;
		this.jwtTokenUtil = jwtTokenUtil;
		this.jwtRequestFilter = jwtRequestFilter;
	}

	// 접근 권한과 관련한 설정
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// csrf차단기능 : get제외한 http메서드 차단
		// csrf차단 기능 해제 : jwt토큰을 사용하므로 csrf차단기능이 않음
		http.csrf().disable();
		http.authorizeRequests()
				
//				.antMatchers("/login").antMatchers("/join/**").antMatchers("/")

				
//				.antMatchers("/notify/email").antMatchers("/notify/write").antMatchers("/notify/my/list")
//				.antMatchers("/img/**")
//				.antMatchers("/member").antMatchers("/member/update").antMatchers("/member/delete").antMatchers("/mypage/passcheck")
//				.antMatchers("/mileage").antMatchers("/mileage/pay").antMatchers("/mileage/**")
//				.antMatchers("/review").authen
				.antMatchers("/**/admin/**").hasRole("y")
				.antMatchers("/comments/**", "/comment/**", "/notify/email", "/notify/write", "/notify/my/list", 
						"/img/**", "/member", "/member/update", "/member/delete", "/mypage/passcheck", "/mileage", 
						"/mileage/pay", "/mileage/**", "/review", "/auth/sellitem", "/sell",
						"/selllist", "/buylistd", "selllistd").authenticated()
				.anyRequest().permitAll()
				.and()
				.addFilter(getAuthenticationFilter()).addFilterBefore(jwtRequestFilter, AuthenticationFilter.class)
				.cors();
		// oauth2
		// 1. 코드받기(인증), 2. 액세스토큰(권한), 3. 사용자 프로필정보보 가져오기
		// 4-1 그 정보를 토대로 회원가입을 자동진행
		// 4-2 (이메일, 이름, 아이디)쇼핑몰 -> (집주소)백화점 -> (vip등급, 일반등급)
		// 구글로그인이 완료되면 액세스토큰 + 사용자프로필 정보를 받음
	}

	private AuthenticationFilter getAuthenticationFilter() throws Exception {
		AuthenticationFilter authenticationFilter = new AuthenticationFilter(memberService, jwtTokenUtil);
		authenticationFilter.setAuthenticationManager(authenticationManager());
		return authenticationFilter;
	}

	// 인증 처리에 필요한 설정
	// 사용자 정보를 조회할 서비스와 패스워드 암호화에 사용할 방식을 지정
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(memberService).passwordEncoder(passwordEncoder);
	}

	// 추후 S3 에서 가져올 모든 자료요청에 대해 시큐리티 작동 무시
	@Override
	public void configure(org.springframework.security.config.annotation.web.builders.WebSecurity web)
			throws Exception {
		web.ignoring().antMatchers("/resources/**", "/dist/**", "/css/**", "/font-awesome/**", "/fonts/**",
				"/image/**}");
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://52.79.138.125", "http://ec2-52-79-138-125.ap-northeast-2.compute.amazonaws.com", "https://olenaelim.shop:9090", "https://olenaelim.shop"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", "token"));
		configuration.setAllowCredentials(true);
		configuration.setMaxAge(3600L);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
