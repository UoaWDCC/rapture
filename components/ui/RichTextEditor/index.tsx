'use client';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { EditorState, SerializedEditorState } from 'lexical';

import { InitialValuePlugin } from './InitialValuePlugin';
import { ToolbarPlugin } from './ToolbarPlugin';

const theme = {
  heading: {
    h1: 'mb-2 text-3xl font-bold',
    h2: 'mb-2 text-2xl font-bold',
    h3: 'mb-1 text-xl font-semibold',
  },
  paragraph: 'my-0',
  quote:
    'my-2 border-l-4 [border-left-style:solid] border-zinc-300 pl-4 italic text-zinc-500 dark:border-zinc-600 dark:text-zinc-400',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
  },
};

const initialConfig = {
  namespace: 'RichTextEditor',
  theme,
  nodes: [HeadingNode, QuoteNode],
  onError: (error: Error) => console.error(error),
};

type RichTextEditorProps = {
  initialValue?: SerializedEditorState;
  onChange: (editorState: EditorState) => void;
};

export function RichTextEditor({ initialValue, onChange }: RichTextEditorProps) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-solid border-black/10 dark:border-white/10 dark:bg-stone-800">
        <ToolbarPlugin />

        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <TabIndentationPlugin />
        <AutoFocusPlugin />
        <InitialValuePlugin initialValue={initialValue} />

        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[200px] max-h-[600px] overflow-y-auto p-4 prose prose-neutral max-w-none text-base leading-relaxed text-wrap outline-none"
                aria-label="Rich text editor"
              />
            }
            placeholder={
              <div className="pointer-events-none absolute top-4 left-4 text-zinc-400 select-none">
                Enter some text...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
    </LexicalComposer>
  );
}