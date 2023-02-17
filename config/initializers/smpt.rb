ActionMailer::Base.smtp_settings = {
  domain: 'quiz-me.fly.dev',
  address:        "smtp.sendgrid.net",
  port:            587,
  authentication: :plain,
  user_name:      Rails.application.credentials.dig(:sendgrid_username),
  password:       Rails.application.credentials.dig(:sendgrid_password)
}