class CreateQuizResults < ActiveRecord::Migration[6.1]
  def change
    create_table :quiz_results do |t|
      t.datetime :start
      t.datetime :end
      t.datetime :completed_at
      t.boolean :finished
      t.integer :user_id
      t.integer :quiz_id

      t.timestamps
    end
  end
end
