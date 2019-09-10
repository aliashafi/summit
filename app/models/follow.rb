class Follow < ApplicationRecord
    validates :user_id, :follower_id, presence: true
    
    belongs_to :user


    belongs_to :follower, 
    primary_key: :id, 
    foreign_key: :follower_id, 
    class_name: :User
end
