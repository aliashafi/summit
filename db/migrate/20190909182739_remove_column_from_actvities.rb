class RemoveColumnFromActvities < ActiveRecord::Migration[5.2]
  def change
    remove_column :activities, :distance
    remove_column :activities, :average_speed
    remove_column :activities, :elapse_time

    add_column :activities, :distance, :float
    add_column :activities, :average_speed, :float
    add_column :activities, :elapse_time, :float

  end
end
