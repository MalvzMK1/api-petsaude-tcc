import prisma from "../lib/prisma";


export default class BlogModel {
    async createPost (id:number, post: post) {
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
    async updatePost (id: number, post: post){
        try {
            return await prisma.blog.update({
                where:{
                    id: id
                },
                data:{
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