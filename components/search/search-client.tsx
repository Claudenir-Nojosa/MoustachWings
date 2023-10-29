"use client"

import { Input } from "../ui/input"
import Spinner from "../ui/spinner"

interface Props {
  inputValue: string
  setInputValue: (value: string) => void
  isHandling?: boolean
}

const SearchClient = ({ inputValue, setInputValue, isHandling }: Props) => {
  return (
    <div className="relative mb-5 mt-8 ">
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        placeholder="Procurar posts"
        className="text-base"
      />
      {isHandling && (
        <div className="absolute right-2 top-2 ">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default SearchClient
