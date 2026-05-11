import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { SerializedEditorState } from 'lexical';

type Props = {
  initialValue?: SerializedEditorState
}

export function InitialValuePlugin({ initialValue }: Props) {
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