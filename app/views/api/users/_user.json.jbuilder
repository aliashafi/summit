json.extract! user, :id, :username, :first_name, :last_name, 
    :city, :state, :sex, :country, :route_ids
json.photoUrl url_for(user.photo)