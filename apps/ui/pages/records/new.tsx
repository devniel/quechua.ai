import { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  Input,
  InputLabel,
  ListItem,
  TextareaAutosize,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Annotation from '../../components/Annotation';
import * as d3 from 'd3';
import * as d3Annotation from 'd3-svg-annotation';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  addAnnotation,
  createRecord,
  deleteAnnotation,
  editAnnotation,
  editRecord,
  getRecord,
} from '../../redux/actions';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TagsInput from '../../components/TagsInput';
import { GithubPicker } from 'react-color';
import AnnotationModal from '../../components/AnnotationModal';
import RecordText from '../../components/RecordText';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import AnnotationCard from '../../components/AnnotationCard';
import RecordModal from '../../components/RecordModal';

const StyledPage = styled.div`
  .page {
  }
`;

const annotations = [
  {
    start: 0,
    end: 7,
    color: 'red',
    text: 'allillan',
    tags: 'text.secondary',
    note: 'text.note',
  },
  {
    start: 8,
    end: 10,
    color: 'blue',
    text: 'chu',
    tags: 'text.secondary',
    note: 'text.note',
  },
];

export function RecordNew() {
  const router = useRouter();
  const [selection, setSelection] = useState<{
    text: string;
    start: number;
    end: number;
  } | null>(null);
  const [text, setText] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!router.isReady) return;
    setText(router.query.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  /** Note */
  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };

  /** Tags */
  const handleChangeTags = (tags) => {
    setTags(tags);
  };

  /** When changing record text */
  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  /** When accepting changes and closing modal */
  const handleOnAccept = () => {
    dispatch(
      createRecord({
        text,
        note,
        tags,
      })
    );
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        p: 5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Typography variant="h5" component="div">
          New record
        </Typography>
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

        {/* Action buttons */}
        <Box
          sx={{
            '& > :not(style)': { m: 1 },
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
            alignItems: 'center',
          }}
        >
          <Button autoFocus href="/">
            Cancel
          </Button>
          <Button onClick={handleOnAccept} autoFocus variant="contained">
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default RecordNew;
