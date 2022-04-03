class AddedUserIdToQuestionResult < ActiveRecord::Migration[6.1]
  def change
    add_column :question_results, :user_id, :integer
  end
end
