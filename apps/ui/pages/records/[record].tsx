import { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
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

export function Record() {
  const router = useRouter();
  const [selection, setSelection] = useState<{
    text: string;
    start: number;
    end: number;
  } | null>(null);
  const [editing, setEditing] = useState(false);
  const record = useSelector((state: any) => state.record);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!router.isReady) return;
    dispatch(getRecord(router.query.record));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const handleTextSelection = ({ text, start, end }) => {
    setSelection({ text, start, end });
  };

  const handleOnCancelAnnotation = () => {
    setSelection(null);
  };

  const handleOnAcceptAnnotation = ({
    selection,
    color,
    note,
    tags,
    formats,
  }) => {
    if (!selection.id) {
      dispatch(
        addAnnotation(record, {
          text: selection.text,
          start: selection.start,
          end: selection.end,
          color,
          note,
          tags,
          formats,
        })
      );
    } else {
      dispatch(
        editAnnotation(record, {
          id: selection.id,
          text: selection.text,
          start: selection.start,
          end: selection.end,
          color,
          note,
          tags,
          formats,
        })
      );
    }
    setSelection(null);
  };

  const handleAnnotationDelete = (annotation) => {
    dispatch(deleteAnnotation(record, annotation));
  };

  const handleAnnotationEdit = (annotation) => {
    setSelection(annotation);
    //dispatch(editAnnotation(record, annotation));
  };

  const handleOnCancelRecordEdition = () => {
    setEditing(false);
  };

  const handleOnAcceptRecordEdition = (record) => {
    setEditing(false);
    dispatch(editRecord(record));
  };

  if (!record) return <></>;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0px',
            padding: '50px 10px 0px 10px',
            position: 'relative',
          }}
        >
          <RecordText
            text={record.text}
            annotations={record.annotations}
            onTextSelection={handleTextSelection}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0px',
            padding: '0px 20px',
            position: 'relative',
          }}
        >
          {record.tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                padding: '0px !important',
                marginTop: '-15px',
                borderRadius: '5px',
                background: 'none',
                fontStyle: 'italic',
                color: '#9e9e9e',
                '& span': {
                  padding: '0px',
                  overflow: 'inherit',
                },
                '& + &': {
                  marginLeft: '5px',
                },
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0px',
            padding: '0px 20px',
            position: 'relative',
          }}
        >
          {record.note}
        </Box>

        {/* Annotation cards */}
        {record.annotations?.map((annotation) => (
          <AnnotationCard
            key={annotation.id}
            {...annotation}
            onDelete={handleAnnotationDelete}
            onEdit={handleAnnotationEdit}
          />
        ))}

        {/*Selection modal */}
        {selection && (
          <AnnotationModal
            selection={selection}
            onCancel={handleOnCancelAnnotation}
            onAccept={handleOnAcceptAnnotation}
          />
        )}

        {/*Record edition modal */}
        {editing && (
          <RecordModal
            record={record}
            onCancel={handleOnCancelRecordEdition}
            onAccept={handleOnAcceptRecordEdition}
          />
        )}

        {/* Action buttons */}
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab
            variant="extended"
            size="medium"
            color="secondary"
            aria-label="edit"
            onClick={() => setEditing(true)}
          >
            <EditIcon sx={{ mr: 1 }} />
            Edit
          </Fab>
          <Link href="/records/new" passHref>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
            >
              <AddIcon sx={{ mr: 1 }} />
              New
            </Fab>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Record;
