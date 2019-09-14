@kudos.each do |kudo|
  json.set! kudo.id do
    json.partial! 'kudo', kudo: kudo
  end
end