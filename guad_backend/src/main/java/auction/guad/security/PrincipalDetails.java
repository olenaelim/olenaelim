package auction.guad.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import auction.guad.dto.MemberDto;
import lombok.Data;

@Data
public class PrincipalDetails implements UserDetails, OAuth2User{
	
	private MemberDto member;
	private Map<String, Object> attributes;

	// login
	public PrincipalDetails(MemberDto member) {
		this.member = member;
	}
	
	// oauth2
	public PrincipalDetails(MemberDto member, Map<String, Object> attributes) {
		this.member = member;
		this.attributes = attributes;
	}

// 권한부여
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collect = new ArrayList<>();
		collect.add(new GrantedAuthority() {
			@Override
			public String getAuthority() {
				return member.getManagerYn();
			}
		});
		return collect;
	}

	@Override
	public String getPassword() {
		return member.getPass();
	}

	@Override
	public String getUsername() {
		return member.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	@Override
	public String getName() {
		return (String)attributes.get("sub");
	}

}
