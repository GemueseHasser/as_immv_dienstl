import React, { useEffect, useRef } from 'react';
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import TitleRoundedIcon from '@mui/icons-material/TitleRounded';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { PremiumButton } from './ui';

function ToolbarButton({ icon, label, onClick }) {
  return (
    <PremiumButton type="button" variant="outlined" onClick={onClick} startIcon={icon} sx={{ minHeight: 40, px: 1.6 }}>
      {label}
    </PremiumButton>
  );
}

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const apply = (command, commandValue = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current.innerHTML);
  };

  return (
    <div className="rich-editor-shell">
      <div className="rich-editor-toolbar">
        <ToolbarButton icon={<TitleRoundedIcon />} label="Überschrift" onClick={() => apply('formatBlock', 'h3')} />
        <ToolbarButton icon={<FormatBoldRoundedIcon />} label="Fett" onClick={() => apply('bold')} />
        <ToolbarButton icon={<FormatItalicRoundedIcon />} label="Kursiv" onClick={() => apply('italic')} />
        <ToolbarButton icon={<FormatListBulletedRoundedIcon />} label="Liste" onClick={() => apply('insertUnorderedList')} />
        <ToolbarButton icon={<FormatListNumberedRoundedIcon />} label="Nummeriert" onClick={() => apply('insertOrderedList')} />
        <ToolbarButton icon={<HorizontalRuleRoundedIcon />} label="Absatz" onClick={() => apply('formatBlock', 'p')} />
      </div>
      <div
        ref={editorRef}
        className="rich-editor-content"
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
      />
    </div>
  );
}
