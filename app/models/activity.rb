class Activity < ApplicationRecord
    validates :activity_type, 	inclusion: { in: ['Run', 'Bike', 'Swim']}
    belongs_to :user

    def parse_coordinates
    
    end

    def parse_elevation
    
    end

    def set_title
        
    end

    def parse_time
    end

end
