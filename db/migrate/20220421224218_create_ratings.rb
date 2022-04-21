class CreateRatings < ActiveRecord::Migration[6.1]
  def change
    create_table :ratings do |t|
      t.integer :value
      t.integer :user_id
      t.integer :quiz_id

      t.timestamps
    end
  end
end
