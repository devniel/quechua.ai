import { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Annotation from '../components/Annotation';
import * as d3 from 'd3';
import * as d3Annotation from 'd3-svg-annotation';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getRecord } from '../redux/actions';

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
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const record = useSelector((state: any) => state.record);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecord(router.query.rid));
  }, []);

  const handleTextSelection = () => {
    console.log(window.getSelection());
    console.log(window.getSelection().toString());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <Typography
          variant="h3"
          component="div"
          color="transparent"
          position="absolute"
          onMouseUp={handleTextSelection}
        >
          {record.text}
        </Typography>
        {record.annotations.map((annotation) => (
          <Typography
            variant="h3"
            component="div"
            color={annotation.color}
            onMouseUp={handleTextSelection}
            unselectable="on"
          >
            {annotation.text}
          </Typography>
        ))}
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
    </Box>
  );
}

export default Record;
