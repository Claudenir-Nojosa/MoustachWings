"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"
import BlogList from "@/components/blog/BlogList"
import SearchClient from "@/components/search/search-client"

export default async function BlogPage() {
  const [inputValue, setInputValue] = useState<string>("")
  const [initialList] = useState(allPosts)
  const [filteredList, setFilteredList] = useState(allPosts)

  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  // Search Handler
  const searchHandler = useCallback(() => {
    const filteredData = initialList.filter((post) => {
      return post.title.toLowerCase().includes(inputValue.toLowerCase())
    })
    setFilteredList(filteredData)
  }, [initialList, inputValue])

  // EFFECT: Search Handler
  useEffect(() => {
    // Debounce search handler
    const timer = setTimeout(() => {
      searchHandler()
    }, 500)

    // Cleanup
    return () => {
      clearTimeout(timer)
    }
  }, [searchHandler])

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Blog realizado com o intuito de registrar aprendizados, e
            compartilhar conhecimento com quem possa se interessar.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <SearchClient inputValue={inputValue} setInputValue={setInputValue} />
      <BlogList posts={inputValue.length > 0 ? filteredList : posts} />
    </div>
  )
}
