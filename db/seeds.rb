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

puts "here"

def makeRoute(path, userId)
    # path = "/Users/aliashafi/Documents/AppAcademy/Projects/summit/db/gpx/Morning_Ride_1.gpx"
    doc = Nokogiri::XML(open(path))
    gpx =  GPX::GPXFile.new(:gpx_file => path)

    lon = doc.xpath('//xmlns:trkpt/@lon').map{|pt| pt.to_s.to_f}
    lat = doc.xpath('//xmlns:trkpt/@lat').map{|pt| pt.to_s.to_f}

    act_type = doc.xpath('//xmlns:type/text()').map{|pt| pt.to_s}

    route = {}
    (0..lat.length).each do |c|
        route[c] = [lon[c],lat[c]]
    end
    route = route.to_json

    ele = doc.xpath('//xmlns:ele/text()').map{|pt| pt.to_s.to_f}
    ele = ele.to_json
    time = doc.xpath('//xmlns:time/text()').map{|pt| pt.to_s}
    title = doc.xpath('//xmlns:name/text()').map{|pt| pt.to_s}

    activity_type = "Run"
    if act_type[0] == "9"
        p act_type[0]
        activity_type = "Run"
    elsif act_type[0] == "1"
        activity_type = "Bike"
    end


    duration = gpx.duration()
    distance = gpx.distance(opts = { :units => 'miles' })
    average_speed = gpx.average_speed()
    time = gpx.time()
    Activity.create!(
        "user_id": userId,
        "activity_type": activity_type,
        "title": title[0],
        "description": "So fun",
        "elapse_time": duration,
        "coordinates": route,
        "elevation": ele, 
        "distance": distance,
        "average_speed": average_speed,
        "time": time 
    )
end

file_names = Dir.entries("#{Rails.root}/db/gpx_routes")
puts "files!"


ActiveRecord::Base.transaction do

    User.destroy_all

    puts "starting users.."

    u1 = User.create!(username: "aliashafi", password:"123456", first_name:"Alia", last_name:"Shafi")
    u1.photo.attach(io: File.open("#{Rails.root}/db/images/indigo.jpg"), filename: "indigo.jpg")

    u2 = User.create!(username: "anandwa", password:"123456", first_name:"Anand", last_name:"Rajesh")
    u2.photo.attach(io: File.open("#{Rails.root}/db/images/indigo.jpg"), filename: "indigo.jpg")
    
    u3 = User.create!(username: "HardCoreHasBeen", password:"123456", first_name:"HardCore", last_name:"HasBeen")
    u3.photo.attach(io: File.open("#{Rails.root}/db/images/indigo.jpg"), filename: "indigo.jpg")

    u4 = User.create!(username: "BobTheAnimal", password:"123456", first_name:"Bob", last_name:"Frank")
    u4.photo.attach(io: File.open("#{Rails.root}/db/images/indigo.jpg"), filename: "indigo.jpg")
    p "done with users"



    Follow.destroy_all

    Follow.create!(user_id: u1.id, follower_id: u2.id)
    Follow.create!(user_id: u1.id, follower_id: u3.id)
    Follow.create!(user_id: u2.id, follower_id: u1.id)
    Follow.create!(user_id: u3.id, follower_id: u1.id)
    Follow.create!(user_id: u4.id, follower_id: u1.id)

    p "done with follows"
    
    Activity.destroy_all

    p "starting activity...."

    file_names[2..-1].each do |file|
        p file
        makeRoute("#{Rails.root}/db/gpx_routes/#{file}", u1.id)
    end


    # makeRoute("#{Rails.root}/db/gpx/Morning_Ride.gpx", u1.id, "Bike")
    # makeRoute("#{Rails.root}/db/gpx/Morning_Run.gpx", u2.id, "Run")
    # makeRoute("#{Rails.root}/db/gpx/Ride3.gpx", u2.id, "Run")
    

end


