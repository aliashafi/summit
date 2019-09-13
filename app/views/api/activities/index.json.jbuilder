json.activities do 
  @activities.each do |activity|
    json.set! activity.id do
      json.partial! 'activity', activity: activity
    end
  end
end

json.comments do 
  @activities.each do |activity|
    activity.comments.each do |comment|
      json.partial! 'api/comments/comment', comment: comment
    end
  end
end
