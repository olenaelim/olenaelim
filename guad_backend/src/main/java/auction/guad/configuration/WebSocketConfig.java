package auction.guad.configuration;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor	
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{
	
//	private final StompHandler stompHandler;
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/ws")
				// CORS
				// websocket에 연결을 허용할 origin, security와 별도로 설정 필요
				.setAllowedOriginPatterns("http://localhost:3000", "https://52.79.138.125", "http://ec2-52-79-138-125.ap-northeast-2.compute.amazonaws.com", "http://172.18.0.31", "https://olenaelim.shop:9090", "https://olenaelim.shop")
				// websocket를 지원하지 않는 브라우저에서 websocket을 사용할 수 있도록 지원해주는 
				// SockJS를 사용하겠다
				.withSockJS();
	}
	

	
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		registry.setApplicationDestinationPrefixes("/pub"); 
		// /pub로 시작하는 url로 데이터를 전송하면 해당 url을 구독하는 client 모두에게 데이터 전송
		registry.enableSimpleBroker("/sub"); 
		// 이 주소를 구독한 채널에 메세지를 전송할 수 있게 등록
		registry.setUserDestinationPrefix("/sub");
        
	}
	
//	@Override
//	public void configureClientInboundChannel(ChannelRegistration registration) {
//		registration.interceptors(stompHandler);
//	}
}