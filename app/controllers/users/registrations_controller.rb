class Users::RegistrationsController < Devise::RegistrationsController
  def create
#Extend their create action. Super = inherit create and then extend
    super do |resource|
#Checks to see if there is a plan in the URL
      if params[:plan]
#Then set that plan id to whatever is in the URL
        resource.plan_id = params[:plan]
#If plan 2, do a special save
        if resource.plan_id == 2
          resource.save_with_subscription
        else
          resource.save
        end
      end
    end
  end
end
