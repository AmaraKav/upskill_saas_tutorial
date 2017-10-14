class UsersController < ApplicationController
  before_action :authenticate_user!
  
  def index 
    
  end
  # Index is viewing all the objects (users)
  # Show is viewing just one object 
  # When GET request to /users/:id
  def show
    @user = User.find( params[:id] )
  end

end