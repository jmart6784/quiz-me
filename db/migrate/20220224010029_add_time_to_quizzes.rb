class AddTimeToQuizzes < ActiveRecord::Migration[6.1]
  def change
    add_column :quizzes, :time, :integer
  end
end
