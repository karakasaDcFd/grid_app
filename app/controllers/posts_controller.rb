class PostsController < ApplicationController
  def show
    @post = Post.find(params[:id])
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      # flash[:success] = "Post created!"
      redirect_to @post
    else
      flash.now[:error] = "無効な拡張子のファイルです"
      render 'new'
    end
  end

private
  def post_params
    params.require(:post).permit(:image, :image_width, :image_height)
  end
end
