class ProfilesController < ApplicationController
  
  # When user makes GET to /users/user_idprofile/new
  def new
    # Render blank profile details form
    @profile = Profile.new
  end
  
end