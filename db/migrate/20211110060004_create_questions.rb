class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :type, default: "one answer", null: false
      t.text :question, null: false
      t.string :option_1, null: false
      t.string :option_2, null: false
      t.string :option_3
      t.string :option_4
      t.string :option_5
      t.string :option_6
      t.string :option_7
      t.string :option_8
      t.string :option_9
      t.string :option_10
      t.string :answer, null: false
      t.integer :quiz_id, null: false
      t.integer :user_id, null: false
      
      t.timestamps
    end
  end
end
