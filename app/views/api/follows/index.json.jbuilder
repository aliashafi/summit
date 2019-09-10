json.set! 'follows' do 
    json.set! 'followers' do 

        @followers.each do |follower|
            json.set! follower.id do 
                json.partial! "api/users/user", user: follower
            end
        end
    end

    json.set! 'following' do 
        @following.each do |follow|
            json.set! follow.id do 
                json.partial! "api/users/user", user: follow
            end
        end
    end

end