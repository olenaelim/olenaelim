//package auction.guad.interceptor;
//
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.stereotype.Component;
//
//import auction.guad.dto.MemberDto;
//import auction.guad.security.JwtTokenUtil;
//import lombok.RequiredArgsConstructor;
//
//@RequiredArgsConstructor
//@Component
//public class StompHandler implements ChannelInterceptor {
//
//    private final JwtTokenUtil jwtTokenUtil;
//    
//    public String interceptedToken;
//    
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
//        interceptedToken = String.valueOf(accessor.getNativeHeader("Authorization"));
//        System.out.println("<<<<<<<<accessor : " + interceptedToken);
//        
//        if(accessor.getCommand() == StompCommand.CONNECT) {
////            if(!jwtTokenUtil.validateToken(accessor.getFirstNativeHeader("token")))
////                try {
////                    throw new AccessDeniedException("");
////                } catch (AccessDeniedException e) {
////                    e.printStackTrace();
////                }
//        }
//        return message;
//    }
//}