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
    title = doc.xpath('//xmlns:name/text()').map{|pt| pt.to_s}

    activity_type = ""
    if act_type[0] == "9"
        activity_type = "Run"
    elsif act_type[0] == "1"
        activity_type = "Bike"
    end

    p activity_type


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
file_names_everyone = Dir.entries("#{Rails.root}/db/gpx_everyone")

puts "files!"


ActiveRecord::Base.transaction do

    User.destroy_all

    puts "starting users.."

    u1 = User.create!(username: "aliashafi", password:"123456", first_name:"Alia", last_name:"Shafi")
    u1.photo.attach(io: File.open("#{Rails.root}/db/images/indigo.jpg"), filename: "indigo.jpg")

    u2 = User.create!(username: "anandwa", password:"123456", first_name:"Anand", last_name:"Rajesh")
    u2.photo.attach(io: File.open("#{Rails.root}/db/images/anand.jpg"), filename: "anand.jpg")
    
    u3 = User.create!(username: "HardCoreHasBeen", password:"123456", first_name:"HardCore", last_name:"HasBeen")
    u3.photo.attach(io: File.open("#{Rails.root}/db/images/indigo.jpg"), filename: "indigo.jpg")

    u4 = User.create!(username: "BobTheAnimal", password:"123456", first_name:"Bob", last_name:"Frank")
    u4.photo.attach(io: File.open("#{Rails.root}/db/images/indigo.jpg"), filename: "indigo.jpg")
    
    u5 = User.create!(username: "PeterTheAnimal", password:"123456", first_name:"Peter", last_name:"Frank")
    u5.photo.attach(io: File.open("#{Rails.root}/db/images/peterwooly.jpg"), filename: "peterwooly.jpg")
    
    u6 = User.create!(username: "iownnoobs", password:"123456", first_name:"Noah", last_name:"Shafi")
    u6.photo.attach(io: File.open("#{Rails.root}/db/images/noahshafi.jpg"), filename: "noahshafi.jpg")
    
    u7 = User.create!(username: "tboz", password:"123456", first_name:"Tara", last_name:"Boz")
    u7.photo.attach(io: File.open("#{Rails.root}/db/images/tara.jpg"), filename: "tara.jpg")
    
    u8 = User.create!(username: "jshaf", password:"123456", first_name:"Jacob", last_name:"Shafi")
    u8.photo.attach(io: File.open("#{Rails.root}/db/images/jacobshafi.jpg"), filename: "jacobshafi.jpg")
    
    u9 = User.create!(username: "crispy", password:"123456", first_name:"Cristy", last_name:"Peterson")
    u9.photo.attach(io: File.open("#{Rails.root}/db/images/cristy.jpg"), filename: "cristy.jpg")
    
    u10 = User.create!(username: "daven", password:"123456", first_name:"Daven", last_name:"Rajesh")
    u10.photo.attach(io: File.open("#{Rails.root}/db/images/daven.jpg"), filename: "daven.jpg")
    
    u11 = User.create!(username: "flower", password:"123456", first_name:"Flower", last_name:"Joe")
    u11.photo.attach(io: File.open("#{Rails.root}/db/images/flower.jpg"), filename: "flower.jpg")
    
    u12 = User.create!(username: "HarryPotter", password:"123456", first_name:"Harry", last_name:"Potter")
    u12.photo.attach(io: File.open("#{Rails.root}/db/images/harrypotter.jpg"), filename: "harrypotter.jpg")
    
    
    u13 = User.create!(username: "Indigo", password:"123456", first_name:"Indigo", last_name:"Catton")
    u13.photo.attach(io: File.open("#{Rails.root}/db/images/indigo.jpg"), filename: "indigo.jpg")
    
    u14 = User.create!(username: "johnnydepp", password:"123456", first_name:"Johnny", last_name:"Depp")
    u14.photo.attach(io: File.open("#{Rails.root}/db/images/johnnydepp.jpg"), filename: "johnnydepp.jpg")
    
    
    u15 = User.create!(username: "kayleee", password:"123456", first_name:"Kaylee", last_name:"Smith")
    u15.photo.attach(io: File.open("#{Rails.root}/db/images/kaylee.jpg"), filename: "kaylee.jpg")

    


    p "done with users"



    Follow.destroy_all

    Follow.create!(user_id: u1.id, follower_id: u2.id)
    Follow.create!(user_id: u1.id, follower_id: u3.id)
    Follow.create!(user_id: u1.id, follower_id: u4.id)
    Follow.create!(user_id: u1.id, follower_id: u5.id)
    Follow.create!(user_id: u1.id, follower_id: u6.id)
    Follow.create!(user_id: u1.id, follower_id: u7.id)
    Follow.create!(user_id: u1.id, follower_id: u8.id)
    Follow.create!(user_id: u1.id, follower_id: u9.id)
    Follow.create!(user_id: u1.id, follower_id: u10.id)
    Follow.create!(user_id: u1.id, follower_id: u11.id)
    Follow.create!(user_id: u1.id, follower_id: u13.id)
    Follow.create!(user_id: u1.id, follower_id: u14.id)
    Follow.create!(user_id: u1.id, follower_id: u15.id)
    Follow.create!(user_id: u1.id, follower_id: u12.id)


    Follow.create!(user_id: u2.id, follower_id: u1.id)
    Follow.create!(user_id: u3.id, follower_id: u1.id)
    Follow.create!(user_id: u4.id, follower_id: u1.id)
    Follow.create!(user_id: u5.id, follower_id: u1.id)
    Follow.create!(user_id: u6.id, follower_id: u1.id)
    Follow.create!(user_id: u7.id, follower_id: u1.id)
    Follow.create!(user_id: u8.id, follower_id: u1.id)
    Follow.create!(user_id: u9.id, follower_id: u1.id)
    Follow.create!(user_id: u10.id, follower_id: u1.id)
    Follow.create!(user_id: u11.id, follower_id: u1.id)
    Follow.create!(user_id: u12.id, follower_id: u1.id)
    Follow.create!(user_id: u13.id, follower_id: u1.id)
    Follow.create!(user_id: u14.id, follower_id: u1.id)

    Follow.create!(user_id: u10.id, follower_id: u12.id)
    Follow.create!(user_id: u9.id, follower_id: u12.id)
    Follow.create!(user_id: u14.id, follower_id: u12.id)

    Follow.create!(user_id: u7.id, follower_id: u15.id)
    Follow.create!(user_id: u8.id, follower_id: u15.id)
    Follow.create!(user_id: u9.id, follower_id: u15.id)
    Follow.create!(user_id: u10.id, follower_id: u15.id)

    Follow.create!(user_id: u11.id, follower_id: u3.id)
    Follow.create!(user_id: u12.id, follower_id: u3.id)
    Follow.create!(user_id: u13.id, follower_id: u3.id)
    Follow.create!(user_id: u14.id, follower_id: u3.id)

    p "done with follows"
    
    Activity.destroy_all

    p "starting activity....u1"

    file_names[2..-1].each do |file|
        next if file == ".DS_Store"
        next if file == "."
        r1 = makeRoute("#{Rails.root}/db/gpx_routes/#{file}", u1.id)
        Kudo.create!(user_id: u2.id, activity_id: r1.id)
        Kudo.create!(user_id: u3.id, activity_id: r1.id)
        Kudo.create!(user_id: u4.id, activity_id: r1.id)
        Kudo.create!(user_id: u5.id, activity_id: r1.id)
        Kudo.create!(user_id: u6.id, activity_id: r1.id)
        Kudo.create!(user_id: u7.id, activity_id: r1.id)
    end

     p "starting activity....all users"
    file_names_everyone[2..-1].each do |file|
        next if file == ".DS_Store"
        next if file == "."
        r2 = makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u2.id)
        r3 = makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u3.id)
        r4 = makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u4.id)
        r5 = makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u5.id)
        r6 = makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u6.id)
        r7 = makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u7.id)
        r8 = makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u8.id)
        makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u9.id)
        makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u10.id)
        makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u11.id)
        makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u12.id)
        makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u13.id)
        makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u14.id)
        makeRoute("#{Rails.root}/db/gpx_everyone/#{file}", u15.id)

        Comment.create!(body: "you are a beast!", user_id: u1.id, activity_id: r3.id)
        Comment.create!(body: "dude so fast!", user_id: u2.id, activity_id: r3.id)
        Comment.create!(body: "next time, invite me", user_id: u3.id, activity_id: r3.id)
        Comment.create!(body: "Can I be as cool as you?", user_id: u4.id, activity_id: r3.id)


        Comment.create!(body: "SOOO COOL!", user_id: u1.id, activity_id: r5.id)
        Comment.create!(body: "So so so fast!", user_id: u2.id, activity_id: r5.id)
        Comment.create!(body: "race ya next time", user_id: u3.id, activity_id: r5.id)

        Kudo.create!(user_id: u2.id, activity_id: r2.id)
        Kudo.create!(user_id: u1.id, activity_id: r3.id)
        Kudo.create!(user_id: u10.id, activity_id: r4.id)
        Kudo.create!(user_id: u11.id, activity_id: r5.id)
        Kudo.create!(user_id: u12.id, activity_id: r6.id)
        Kudo.create!(user_id: u15.id, activity_id: r7.id)
        Kudo.create!(user_id: u12.id, activity_id: r8.id)
        Kudo.create!(user_id: u9.id, activity_id: r3.id)
        Kudo.create!(user_id: u3.id, activity_id: r4.id)



    end


    # makeRoute("#{Rails.root}/db/gpx/Morning_Ride.gpx", u1.id, "Bike")
    # makeRoute("#{Rails.root}/db/gpx/Morning_Run.gpx", u2.id, "Run")
    # makeRoute("#{Rails.root}/db/gpx/Ride3.gpx", u2.id, "Run")
    

end


