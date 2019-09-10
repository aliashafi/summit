# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


### testing out the seeding 
#require 'nokogiri'
#require 'GPX'


path = "/Users/aliashafi/Documents/AppAcademy/Projects/summit/db/gpx/Morning_Ride.gpx"
doc = Nokogiri::XML(open(path))
gpx =  GPX::GPXFile.new(:gpx_file => path)

lon = doc.xpath('//xmlns:trkpt/@lon').map{|pt| pt.to_s.to_f}
lat = doc.xpath('//xmlns:trkpt/@lat').map{|pt| pt.to_s.to_f}
#route = {"lat" => lat, "lon" => lon}.to_json

route = {}
(0..lat.length).each do |c|
    route[c] = [lon[c],lat[c]]
end
route = route.to_json

ele = doc.xpath('//xmlns:ele/text()').map{|pt| pt.to_s.to_f}
ele = ele.to_json
time = doc.xpath('//xmlns:time/text()').map{|pt| pt.to_s}

duration = gpx.duration()
distance = gpx.distance(opts = { :units => 'miles' })
average_speed = gpx.average_speed()
time = gpx.time()

Activity.create!(
    "user_id": 1,
    "activity_type": "Run",
    "title": "My first run on Summit!",
    "description": "So fun",
    "elapse_time": duration,
    "coordinates": route,
    "elevation": ele, 
    "distance": distance,
    "average_speed": average_speed,
    "time": time 
)


