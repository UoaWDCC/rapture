import { TabIndentationExtension } from '@lexical/extension';
import { HistoryExtension } from '@lexical/history';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalExtensionComposer } from '@lexical/react/LexicalExtensionComposer';
import { RichTextExtension } from '@lexical/rich-text';
import { defineExtension, EditorState, SerializedEditorState } from 'lexical';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import { ToolbarPlugin } from './ToolbarPlugin';
import { InitialValuePlugin } from './InitialValuePlugin';

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

const landingHeroExtension = defineExtension({
  dependencies: [RichTextExtension, HistoryExtension, TabIndentationExtension],
  name: '@lexical/website/landing-hero-editor',
  namespace: '@lexical/website/landing-hero-editor',
  theme,
});

type RichTextEditorProps = {
  initialValue: SerializedEditorState;
  onChange: (editorState: EditorState) => void;
}

export function RichTextEditor({ initialValue, onChange }: RichTextEditorProps) {
  return (
    <LexicalExtensionComposer
      extension={landingHeroExtension}
      contentEditable={null}
    >
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-solid border-black/10 dark:border-white/10 dark:bg-stone-800">
        <ToolbarPlugin />

        <OnChangePlugin onChange={onChange} />

        <InitialValuePlugin initialValue={initialValue} />

        <div className="relative">
          <ContentEditable
            className="h-[500px] overflow-y-auto p-4 text-base leading-relaxed text-wrap outline-none"
            aria-label="Rich text editor"
            aria-placeholder="Enter some text..."
            placeholder={
              <div className="pointer-events-none absolute top-4 left-4 text-zinc-400 select-none">
                Enter some text...
              </div>
            }
          />
        </div>
      </div>
    </LexicalExtensionComposer>
  );
}
