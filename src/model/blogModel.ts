import prisma from "../lib/prisma";


export default class BlogModel {
    async createPost(id: number, post: post) {
        try {
            return await prisma.blog.create({
                data: {
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
    async updatePost(id: number, post: post) {
        try {
            return await prisma.blog.update({
                where: {
                    id: id
                },
                data: {
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
    async getAllPosts() {
        try {
            return await prisma.blog.findMany()
        } catch (err) {
            console.log(err);
            throw new Error(`${err}`);
        }
    }
    async deletePost(id:number) {
        try {
            return await prisma.blog.delete({
                where:{
                    id: id
                }
            })
        } catch (err) {
            console.log(err);
            throw new Error(`${err}`);
        }
    }
}