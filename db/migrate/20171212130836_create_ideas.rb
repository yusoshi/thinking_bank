class CreateIdeas < ActiveRecord::Migration[5.0]
  def change
    create_table :ideas do |t|
      t.string          :title, null: false, index: true
      t.text            :body, null: false
      t.references      :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
