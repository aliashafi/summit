class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :city
      t.string :state
      t.string :country
      t.string :sex
      t.string :session_token, null: false
      t.string :password_digest, null: false

      t.timestamps
    end

    add_index :users, :username, unique: true
    add_index :users, [:first_name, :last_name], unique: true
  end
end
