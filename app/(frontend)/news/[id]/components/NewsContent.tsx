'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NewsPost } from '../../mockData'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { RichTextEditor } from '@/components/ui/RichTextEditor'
import { EditorState } from 'lexical'

interface Props {
  post: NewsPost
  isAdmin: boolean
}

export function NewsContent({ post, isAdmin }: Props) {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(post.title)
  const [saving, setSaving] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [contentError, setContentError] = useState(false)

  // Live editor state (NOT reactive)
  const contentRef = useRef(post.content)

  // UI state (what user sees after save)
  const [savedContent, setSavedContent] = useState(post.content)

  function handleEditorChange(editorState: EditorState) {
    editorState.read(() => {
      contentRef.current = editorState.toJSON()
    })
  }

  async function handleSave() {
    const contentIsEmpty =
      !contentRef.current ||
      (typeof contentRef.current === 'object' &&
        (!contentRef.current.root?.children?.length ||
          contentRef.current.root.children.every(
            (node: any) =>
              node.children?.length === 0 ||
              node.children?.every((child: any) => child.text === '')
          )))

    setTitleError(!title.trim())
    setContentError(contentIsEmpty)

    if (!title.trim() || contentIsEmpty) return

    setSaving(true)

    try {
      // TODO: Update news post API call here

      setSavedContent(contentRef.current)
      setIsEditing(false)
      router.refresh()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    setTitle(post.title)
    contentRef.current = post.content
    setTitleError(false)
    setContentError(false)
    setIsEditing(false)
  }

  return (
    <main className="max-w-[760px] mx-auto px-6 py-8">

      {/* Back */}
      <Link
        href="/news"
        className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 no-underline mb-7"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 3L5 8l5 5" />
        </svg>
        Back to News
      </Link>

      {/* Title */}
      {isEditing ? (
        <input
          value={title}
          onChange={e => {
            setTitle(e.target.value)
            setTitleError(false)
          }}
          placeholder="Title"
          className={`block w-full text-2xl font-medium text-[#1a1a1a] bg-white rounded-lg px-3.5 py-2.5 outline-none mb-2 border leading-snug ${titleError ? 'border-red-400' : 'border-black/20'
            }`}
        />
      ) : (
        <h1 className="text-[26px] font-medium text-[#1a1a1a] leading-snug mb-2">
          {title}
        </h1>
      )}

      {/* Image placeholder */}
      <div className="w-full h-[280px] bg-gray-200 flex items-center justify-center mb-7" />

      {/* Content */}
      {isEditing ? (
        <RichTextEditor
          initialValue={contentRef.current}
          onChange={handleEditorChange}
        />
      ) : (
        <div className="prose prose-neutral max-w-none">
          <RichText data={savedContent} />
        </div>
      )}

      {/* Error */}
      {(titleError || contentError) && (
        <p className="text-xs text-red-400 mt-2">
          Title and content are required.
        </p>
      )}

      {/* Actions */}
      {isAdmin && (
        <div className="flex gap-2 mt-8 pt-5 border-t border-black/10">

          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-foreground text-[13px] font-medium transition duration-200 hover:opacity-90 text-background rounded-lg p-3 cursor-pointer"
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>

              <button
                onClick={handleCancel}
                disabled={saving}
                className="text-[13px] font-medium px-4 py-1.5 rounded-lg border border-black/15 bg-transparent text-gray-500 cursor-pointer hover:opacity-70"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-foreground text-[13px] font-medium transition duration-200 hover:opacity-90 text-background rounded-lg p-3 cursor-pointer"
            >
              Edit post
            </button>
          )}

        </div>
      )}
    </main>
  )
}