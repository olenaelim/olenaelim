package auction.guad.aop;

import java.util.Collections;

import org.springframework.aop.Advisor;
import org.springframework.aop.aspectj.AspectJExpressionPointcut;
import org.springframework.aop.support.DefaultPointcutAdvisor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.interceptor.MatchAlwaysTransactionAttributeSource;
import org.springframework.transaction.interceptor.RollbackRuleAttribute;
import org.springframework.transaction.interceptor.RuleBasedTransactionAttribute;
import org.springframework.transaction.interceptor.TransactionInterceptor;

@Configuration
public class TransactionAspect {

	private static final String AOP_TRASACTION_METHOD_NAME = "*";
	private static final String AOP_TRASACTION_EXPRESSION = "execution(* board..service.*Impl.*(..))";
	
	@Autowired
	private PlatformTransactionManager transactionManager; 
	
	@Bean
	public TransactionInterceptor transactionAdvice() {
		RuleBasedTransactionAttribute transactionAttribute = new RuleBasedTransactionAttribute(); 
		// 트랜잭션 이름 설정 (트랜잭션 모니터링에서 트랜잭션 이름으로 확인이 가능)
		transactionAttribute.setName(AOP_TRASACTION_METHOD_NAME);
		// 트랜잭션에서 롤백하는 룰을 설정 (여기에서는 예외가 발생하면 롤백이 수행되도록 설정)
		transactionAttribute.setRollbackRules(
				Collections.singletonList(new RollbackRuleAttribute(Exception.class))
		);
		
		MatchAlwaysTransactionAttributeSource source = new MatchAlwaysTransactionAttributeSource();
		source.setTransactionAttribute(transactionAttribute);
		
		return new TransactionInterceptor(transactionManager, source);
	}
	
	@Bean
	public Advisor transactionAdviceAdvisor() {
		AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
		// AOP의 포인트컷을 설정
		pointcut.setExpression(AOP_TRASACTION_EXPRESSION);
		return new DefaultPointcutAdvisor(pointcut, transactionAdvice());
	}
}
