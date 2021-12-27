import { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import Annotation from '../components/Annotation';
import * as d3 from 'd3';
import * as d3Annotation from 'd3-svg-annotation';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { addAnnotation, getRecord } from '../redux/actions';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TagsInput from '../components/TagsInput';
import { GithubPicker } from 'react-color';
import AnnotationModal from '../components/AnnotationModal';
import RecordText from '../components/RecordText';

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
    tag: 'text.secondary',
    note: 'text.note',
  },
  {
    start: 8,
    end: 10,
    color: 'blue',
    text: 'chu',
    tag: 'text.secondary',
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
  const theme = useTheme();
  const record = useSelector((state: any) => state.record);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecord(router.query.rid));
  }, []);

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
    console.log('handleOnAcceptAnnotation()');
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
    setSelection(null);
  };

  if (!record) return <></>;

  return (
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
          padding: '50px 10px 30px 10px',
          position: 'relative',
        }}
      >
        <RecordText
          text={record.text}
          annotations={record.annotations}
          onTextSelection={handleTextSelection}
        />
      </Box>

      {record.annotations.map((annotation) => (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Typography variant="h5" component="div" flex="1">
                {annotation.text}
              </Typography>
              <Box
                sx={{
                  width: '15px',
                  height: '15px',
                  borderRadius: '15px',
                  backgroundColor: annotation.color,
                  display: 'inline-block',
                }}
              ></Box>
            </Box>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {annotation.tag}
            </Typography>
            <Typography variant="body2">{annotation.note}</Typography>
          </CardContent>
        </Card>
      ))}

      {selection && (
        <AnnotationModal
          selection={selection}
          onCancel={handleOnCancelAnnotation}
          onAccept={handleOnAcceptAnnotation}
        />
      )}
    </Box>
  );
}

export default Record;
