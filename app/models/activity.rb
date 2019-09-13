class Activity < ApplicationRecord
    validates :activity_type, 	inclusion: { in: ['Run', 'Bike', 'Swim']}
    belongs_to :user

    has_many :comments
    has_many :kudos

    
    def self.find_midpoint(coords)
        ##get average of all lat/lng coordinates to find center
        lats = coords.map{|el| el[0]}
        lngs = coords.map{|el| el[1]}
        lats.pop() ## last val is nil
        lngs.pop()
        return [(lngs.sum()/lngs.length),(lats.sum()/lats.length)]
    end

 
end
