class UsersController < ApplicationController
  
  # Index is viewing all the objects (users)
  # Show is viewing just one object 
  # When GET request to /users/:id
  def show
    @user = User.find( params[:id] )
  end

end