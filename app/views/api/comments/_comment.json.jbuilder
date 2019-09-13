json.set! comment.id do 
    json.extract! comment, :body, :id, :activity_id, :user_id
end