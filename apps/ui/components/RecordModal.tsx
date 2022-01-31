import { PropsWithChildren, useState } from 'react';
import { css, jsx } from '@emotion/react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import TagsInput from './TagsInput';
import { GithubPicker } from 'react-color';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Annotation } from '@quechua.ai/entities';

interface Props {
  record: {
    id?: string;
    start: number;
    end: number;
    color?: string;
    text?: string;
    tags?: string[];
    note?: string;
    formats?: string[];
  };
  onCancel: () => void;
  onAccept: (annotation) => void;
}

export default function RecordModal({
  record,
  onCancel = () => {},
  onAccept = () => {},
}: PropsWithChildren<Props>) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [text, setText] = useState<string>(record.text || '');
  const [note, setNote] = useState<string>(record.note || '');
  const [tags, setTags] = useState(record.tags || []);
  const [color, setColor] = useState(record.color);
  const [formats, setFormats] = useState<string[]>(record.formats || []);

  /** Note */
  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };

  /** Tags */
  const handleChangeTags = (tags) => {
    setTags(tags);
  };

  /** When closing modal by using 'Cancel' or 'X' */
  const handleOnCancel = () => {
    onCancel();
  };

  /** When accepting changes and closing modal */
  const handleOnAccept = () => {
    onAccept({
      ...record,
      text,
      note,
      tags,
      color,
      formats,
    });
  };

  /** When changing record text */
  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open
      onClose={onCancel}
      aria-labelledby="responsive-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{
          pt: 4,
          fontSize: '1.5rem',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" component="div">
          {text}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="text"
          type="text"
          fullWidth
          variant="standard"
          multiline
          value={text}
          onChange={handleChangeText}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="note"
          type="text"
          fullWidth
          variant="standard"
          multiline
          value={note}
          onChange={handleChangeNote}
        />
        <TagsInput
          fullWidth
          margin="dense"
          variant="standard"
          id="tags"
          name="tags"
          label="tags"
          value={tags}
          onChange={handleChangeTags}
        />
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
        }}
      >
        <Button autoFocus onClick={handleOnCancel}>
          Cancel
        </Button>
        <Button onClick={handleOnAccept} autoFocus variant="contained">
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}
