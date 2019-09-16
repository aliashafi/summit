class Route < ApplicationRecord
    validates :route_type, 	inclusion: { in: ['Run', 'Ride']}
    belongs_to :user
end
