class AddColumnToActivitiesTime < ActiveRecord::Migration[5.2]
  def change
    add_column :activities, :time, :datetime
  end
end
