class AddDefaultBooleanToQuizResult < ActiveRecord::Migration[6.1]
  def change
    change_column_default :quiz_results, :finished, false
  end
end
