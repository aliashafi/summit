class AddIndexOnKudos < ActiveRecord::Migration[5.2]
  def change
    add_index :kudos, [:user_id, :activity_id], unique: true
  end
end
