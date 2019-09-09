class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.integer :user_id, null: false
      t.string :activity_type, null: false
      t.string :title
      t.string :description
      t.integer :elapse_time
      t.string :elevation
      t.string :coordinates

      t.timestamps
    end
    add_index :activities, :user_id
    add_index :activities, :title
  end
end
