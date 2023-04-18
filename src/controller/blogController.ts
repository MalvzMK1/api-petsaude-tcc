import Message from '../messages/message';
import BlogModel from '../model/blogModel';

const blogModel = new BlogModel();
const message = new Message();

class BlogController {
	async createPost(id: number, post: post) {
		try {
			const createPost = await blogModel.createPost(id, post);
			if (createPost)
				return {
					statusCode: 201,
					message: createPost,
				};
			return {
				statusCode: 400,
				message: message.MESSAGE_ERROR.REQUIRED_FIELDS,
			};
		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: JSON.parse(err.message),
				};
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
	async updatePost(id: number, post: post) {
		try {
			const postUpdate = await blogModel.updatePost(id, post)
			if (postUpdate)
				return {
					statusCode: 201,
					message: postUpdate,
				}
			return {
				statusCode: 400,
				message: message.MESSAGE_ERROR.REQUIRED_FIELDS,
			};

		} catch (err) {
			if (err instanceof Error)
				return {
					statusCode: 500,
					message: JSON.parse(err.message),
				};
			return {
				statusCode: 500,
				message: message.MESSAGE_ERROR.INTERNAL_ERROR_DB,
			};
		}
	}
}

export default new BlogController()