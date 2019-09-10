class User < ApplicationRecord

    validates :username, :session_token, presence: true, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true
    validates :password_digest, presence: true

    attr_reader :password
    after_initialize :ensure_session_token

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        user && user.is_password?(password) ? user : nil
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        self.password_digest = BCrypt::Password.create(password)
        @password = password
    end

    def reset_session_token!
        self.session_token = SecureRandom::urlsafe_base64
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom::urlsafe_base64
    end

    has_many :activities

    ##links to the follow table
    has_many :follows 

    ##follows people
    has_many :followed_user, 
    primary_key: :id, 
    foreign_key: :follower_id, 
    class_name: :Follow

    ##returns the users that follow given user
    has_many :followers, 
    through: :follows,
    source: :follower

    ##returns the users that a given user follows
    has_many :following, 
    through: :followed_user, 
    source: :user
    



end
