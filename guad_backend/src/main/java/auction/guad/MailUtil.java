package auction.guad;

import java.util.Map;
import java.util.Properties;

import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Component
public class MailUtil {

	@Autowired
	private MailProperties mailProperties;

	@Autowired
	private TemplateEngine htmlTemplateEngine;

	public void sendTemplateMail(String toMail, String subject, String fromName, Map<String, Object> variables)
			throws Exception {
		Context context = new Context();
		context.setVariables(variables);

		
		JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

		Properties props = new Properties();
		props.setProperty("mail.transport.protocol", "smtp");
		props.setProperty("mail.host", "smtp.gmail.com");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "587");
		props.put("mail.debug", "true");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.socketFactory.fallback", "false");

		String from2 = "olenaelim@gmail.com";
		String password = "obtwybsgiwdjahba";

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(from2, password);
			}
		});
		
		javaMailSender.setSession(session);

		InternetAddress from = new InternetAddress(mailProperties.getUsername(), fromName);
		InternetAddress to = new InternetAddress(toMail);

		String htmlTemplate = htmlTemplateEngine.process("Email/Email", context);

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");

		messageHelper.setFrom(from);
		messageHelper.setTo(to);
		messageHelper.setSubject(subject);
		messageHelper.setText(htmlTemplate, true);

		javaMailSender.send(mimeMessage);
	}
}
