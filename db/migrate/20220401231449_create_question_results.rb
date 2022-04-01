class CreateQuestionResults < ActiveRecord::Migration[6.1]
  def change
    create_table :question_results do |t|
      t.boolean :correct
      t.string :answer
      t.string :user_answer
      t.integer :question_id
      t.integer :quiz_id
      t.integer :quiz_result_id

      t.timestamps
    end
  end
end
