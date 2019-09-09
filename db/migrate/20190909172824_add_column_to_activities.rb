class AddColumnToActivities < ActiveRecord::Migration[5.2]
  def change
    add_column :activities, :distance, :integer
    add_column :activities, :average_speed, :integer
  end
end
