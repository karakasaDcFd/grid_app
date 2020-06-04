class ChangeColumnToPost < ActiveRecord::Migration[5.1]
  # 変更内容
  def up
    change_column :posts, :id, :string
  end

  # 変更前の状態
  def down
    change_column :posts, :id, :integer
  end
end
