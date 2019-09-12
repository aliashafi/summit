json.set! 'follows' do 
    json.set! 'followers' do 

        @followers.each do |follower|
            json.set! follower.id do 
                json.extract! follower, :id
            end
        end
    end

    json.set! 'following' do 
        @following.each do |follow|
            json.set! follow.id do 
                json.extract! follow, :id
            end
        end
    end

end