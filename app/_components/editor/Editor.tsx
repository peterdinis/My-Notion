'use client';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import { useTheme } from 'next-themes';
import { useEdgeStore } from '@/lib/edgestore';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useCopyToClipboard } from '@/app/_hooks/use-copy';
import { Button } from '@/components/ui/button';

interface EditorProps {
  onChange: (content: string) => void;
  initialContent?: string;
  editable?: boolean;
}

function Editor({ onChange, initialContent, editable }: EditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  const handleChange = () => {
    const content = editor.topLevelBlocks;
    onChange(JSON.stringify(content, null, 2));
  };

  // Use the copy-to-clipboard hook
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    const content = JSON.stringify(editor.topLevelBlocks, null, 2);
    copyToClipboard(content);
  };

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        editable={editable}
        onChange={handleChange}
      />
      <Button
        onClick={handleCopy}
        size={"lg"}
        variant={"default"}
      >
        Copy Content
      </Button>
    </div>
  );
}

export default Editor;