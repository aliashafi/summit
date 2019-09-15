@users.each do |user|
  json.set! user.id do
    json.partial! 'user', user: user
  end
end

json.kudos do 
  @users.each do |user|
    user.routes.each do |route|
      json.partial! 'api/routes/route', route: route
    end
  end
end