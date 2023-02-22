class CreateSubscribers < ActiveRecord::Migration[6.1]
  def change
    create_table :subscribers do |t|
      t.string :email
      t.string :name
      t.boolean :status, default: false

      t.timestamps
    end
  end
end
