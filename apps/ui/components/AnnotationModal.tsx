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
  selection: {
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

export default function AnnotationModal({
  selection,
  onCancel = () => {},
  onAccept = () => {},
}: PropsWithChildren<Props>) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [note, setNote] = useState<string>(selection.note || '');
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [tags, setTags] = useState(selection.tags || []);
  const [color, setColor] = useState(selection.color);
  const [formats, setFormats] = useState<string[]>(selection.formats || []);

  /** Note */
  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };

  /** Tags */
  const handleChangeTags = (tags) => {
    setTags(tags);
  };

  /** Color */
  const handleChangeColor = ({ hex }) => {
    setColor(hex);
    setOpenColorPicker(false);
  };

  /** When closing modal by using 'Cancel' or 'X' */
  const handleOnCancel = () => {
    onCancel();
  };

  /** When accepting changes and closing modal */
  const handleOnAccept = () => {
    onAccept({
      selection,
      note,
      tags,
      color,
      formats,
    });
  };

  /** Formats */
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats);
  };

  const getFormatsAsStyle = () => ({
    textDecoration: formats.includes('underlined') ? 'underline' : 'unset',
    fontWeight: formats.includes('bold') ? 'bold' : 'unset',
    fontStyle: formats.includes('italic') ? 'italic' : 'unset',
  });

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
        <Typography
          variant="h3"
          component="div"
          color={color}
          sx={getFormatsAsStyle()}
        >
          {selection?.text}
        </Typography>
      </DialogTitle>

      <DialogContent>
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

        <ToggleButtonGroup
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
          sx={{
            mt: 3,
          }}
        >
          <ToggleButton value="bold" aria-label="bold">
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined">
            <FormatUnderlinedIcon />
          </ToggleButton>

          <Box
            sx={{
              position: 'relative',
              ml: 1,
            }}
          >
            <ToggleButton
              value="color"
              aria-label="color"
              onClick={() => setOpenColorPicker(!openColorPicker)}
              selected={!!color}
            >
              <FormatColorFillIcon
                sx={{
                  fill: color,
                }}
              />
              <ArrowDropDownIcon />
            </ToggleButton>
            {openColorPicker && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '0px',
                }}
              >
                <GithubPicker
                  color={color}
                  onChangeComplete={handleChangeColor}
                  triangle="hide"
                />
              </Box>
            )}
          </Box>
        </ToggleButtonGroup>
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
