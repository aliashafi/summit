json.set! route.id do
    json.extract! route, :id, :user_id, :title, :coordinates
end