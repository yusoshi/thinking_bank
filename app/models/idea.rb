class Idea < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :body, presence: true

  def self.define_num_of_page(id, all_ideas)
    all_ideas.each.with_index(1) do |idea, index|
      if id == idea.id
        return index
      end
    end
  end

end
