import React, { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { Post } from "@/.contentlayer/generated"

import { formatDate } from "@/lib/utils"

interface BlogListProps {
  posts: Post[]
}

const BlogList: FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      {posts.map(
        (
          post // Itera sobre a lista de postagens
        ) => (
          <article
            key={post._id}
            className="group relative flex flex-col space-y-2"
          >
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={804}
                height={452}
                className="rounded-md border bg-muted transition-colors"
              />
            )}
            <h2 className="text-2xl font-extrabold">{post.title}</h2>
            {post.description && (
              <p className="text-muted-foreground">{post.description}</p>
            )}
            {post.date && (
              <p className="text-sm text-muted-foreground">
                {formatDate(post.date)}
              </p>
            )}
            <Link href={post.slug} className="absolute inset-0">
              <span className="sr-only">View Article</span>
            </Link>
          </article>
        )
      )}
    </div>
  )
}

export default BlogList
