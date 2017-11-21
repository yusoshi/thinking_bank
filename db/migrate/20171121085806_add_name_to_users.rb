class AddNameToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :name, :string, index: true, limit: 20, unique: true
  end
end
