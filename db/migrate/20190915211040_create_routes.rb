class CreateRoutes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes do |t|
      t.integer :user_id, null: false
      t.text :coordinates, null: false
      t.string :title, null: false

      t.timestamps
    end

    add_index :routes, :user_id
  end
end
