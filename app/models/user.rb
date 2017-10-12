class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  belongs_to :plan  
  has_one :profile
  
  # To take form data and read it, you need to white list it
  attr_accessor :stripe_card_token
  def save_with_subscription
    if valid?
  # Call Stripe and save that response to a variable (One time token)
      customer = Stripe::Customer.create(description: email, plan: plan_id, card: stripe_card_token)
  # Insert token into db table and save. (To create a subscription)
      self.stripe_customer_token = customer.id
      save!
    end
  end
end
