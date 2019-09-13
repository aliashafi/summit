class CreateKudos < ActiveRecord::Migration[5.2]
  def change
    create_table :kudos do |t|
      t.integer :activity_id, null: false, indexed: true
      t.integer :user_id, null: false, indexed: true
      t.timestamps
    end
  end
end
