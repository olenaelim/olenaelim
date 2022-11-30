package auction.guad.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import auction.guad.interceptor.LoggerInterceptor;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

	@Autowired
	Environment env;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new LoggerInterceptor());
	}

	// spring security에서는 다른 방식으로
	@Override
	public void addCorsMappings(CorsRegistry registry) {
//		registry.addMapping("/**")
//			.allowedOrigins("http://localhost:3000", "http://192.168.0.35:3000")
//			.allowedMethods("GET", "DELETE", "PUT", "POST", "OPTIONS");
	}

	//addResourceHandler 요청을 addResourceLocations로 매핑해준다.
	//이후 요청 주소를 S3로 변경해야한다.
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		registry.addResourceHandler("/image/**").addResourceLocations("file:C:/img/").setCachePeriod(20);
		registry.addResourceHandler("/image/**").addResourceLocations("https://s3.ap-northeast-2.amazonaws.com/olenaelim-image-storage/").setCachePeriod(20);
	}

}
