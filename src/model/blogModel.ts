import prisma from "../lib/prisma";


export default class BlogModel {
    async createPost (id:number, post: createPost) {
        try {
            return await prisma.blog.create({
                data:{
                    veterinaryId: id,
                    text: post.text,
                    title: post.title,
                    image: post.image
                }
            })
        } catch (err) {
			console.log(err);
			throw new Error(`${err}`);
        }
    }
}