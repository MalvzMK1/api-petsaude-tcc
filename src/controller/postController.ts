import Message from '../messages/message';
import PostModel from '../model/postModel';

const postModel = new PostModel();
const message = new Message();

class postController {
    async createPost (id:number,post: post) {
        try {
            const createPost = await postModel.createPost(id,post);
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
			const postUpdate = await postModel.updatePost(id, post)
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
    async getAllPosts() {
		try {
			const getPost = await postModel.getAllPosts()
			if (getPost)
				return {
					statusCode: 201,
					message: getPost,
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
	async deletePost(id: number) {
		try {
			const deletePost = await postModel.deletePost(id)
			if (deletePost)
				return {
					statusCode: 201,
					message: "Post excluido com sucesso",
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

export default new postController()