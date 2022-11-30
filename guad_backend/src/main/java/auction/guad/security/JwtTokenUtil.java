package auction.guad.security;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;
import java.util.function.Function;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import auction.guad.dto.MemberDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

// https://www.javainuse.com/spring/boot-jwt

@Slf4j
@Component
public class JwtTokenUtil {

	private String secret;
	private Long expirationTime;
	
	@Autowired
	public JwtTokenUtil(Environment env) {
		this.secret = env.getProperty("token.secret");
		this.expirationTime = Long.valueOf(env.getProperty("token.expiration-time"));
		
		log.debug(this.secret);
		log.debug(Long.toString(this.expirationTime));
	}
	
	public String generateToken(MemberDto member) {
		
		Key hmacKey = new SecretKeySpec(
			Base64.getDecoder().decode(this.secret), SignatureAlgorithm.HS256.getJcaName()
		);
		
		Instant now = Instant.now();
		String jwtToken = Jwts.builder()
				.claim("name", member.getNickname())
				.claim("email", member.getEmail())
				.setSubject(member.getEmail())
				.setId(UUID.randomUUID().toString())
				.setIssuedAt(Date.from(now))
				.setExpiration(Date.from(now.plus(this.expirationTime, ChronoUnit.MILLIS)))
				.signWith(hmacKey)
				.compact();
		log.debug(jwtToken);
		
		return jwtToken;
	}
	
	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}
	
	public Boolean validateToken(String token, UserDetails userDetails) {
		String subject = getSubjectFromToken(token);
		String username = userDetails.getUsername();
		
		if (subject != null && username != null && subject.equals(username) && !isTokenExpired(token)) {
			return Boolean.TRUE;
		} else {
			return Boolean.FALSE;
		}		
	}
	
	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}
	
	public String getSubjectFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}
	
	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}
	
	public Claims getAllClaimsFromToken(String token) {
		
		Key hmacKey = new SecretKeySpec(
			Base64.getDecoder().decode(this.secret), SignatureAlgorithm.HS256.getJcaName()
		);
		
		Jws<Claims> jwt = Jwts.parserBuilder()
				.setSigningKey(hmacKey)
				.build()
				.parseClaimsJws(token);
		
		return jwt.getBody();
	}
}
