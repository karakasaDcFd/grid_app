class Post < ApplicationRecord
    mount_uploader :image, ImageUploader

    before_create :generate_token

    # UUID生成
    def generate_token
        self.id = loop do
            random_token = SecureRandom.uuid
            break random_token unless self.class.exists?(id: random_token)
        end
    end
end
