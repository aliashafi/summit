class AddColumnToActivity < ActiveRecord::Migration[5.2]
  def change
    add_column :activities, :time_stamps, :text
  end
end
