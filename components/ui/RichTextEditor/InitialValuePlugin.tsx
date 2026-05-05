import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export function InitialValuePlugin({ initialValue }: { initialValue?: any }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!initialValue) return;

    try {
      const parsed = editor.parseEditorState(initialValue);
      editor.setEditorState(parsed);
    } catch (err) {
      console.error('Failed to load initial editor state', err);
    }
  }, [editor, initialValue]);

  return null;
}