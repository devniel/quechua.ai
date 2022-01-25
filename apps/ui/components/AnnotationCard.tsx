import { PropsWithChildren } from 'react';
import { css, jsx } from '@emotion/react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { Annotation } from '@quechua.ai/entities';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TagsInput from './TagsInput';
import Chip from '@mui/material/Chip';

export default function AnnotationCard({
  id,
  text,
  color,
  tags,
  formats,
  note,
  start,
  end,
  onDelete = () => {},
  onEdit = () => {},
}: PropsWithChildren<
  Annotation & {
    onDelete: ({ start, end }) => void;
    onEdit: (annotation: Annotation) => void;
  }
>) {
  const getFormatsAsStyle = () => ({
    textDecoration: formats.includes('underlined') ? 'underline' : 'unset',
    fontWeight: formats.includes('bold') ? 'bold' : 'unset',
    fontStyle: formats.includes('italic') ? 'italic' : 'unset',
  });
  return (
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
          <Typography
            variant="h5"
            component="div"
            color={color}
            flex={1}
            sx={getFormatsAsStyle()}
          >
            {text}
          </Typography>
          <IconButton
            aria-label="edit"
            onClick={() =>
              onEdit({ id, text, color, tags, formats, note, start, end })
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => onDelete({ start, end })}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        {tags.map((tag) => (
          <Chip
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
        <Typography
          variant="body2"
          sx={{
            marginTop: '5px',
          }}
        >
          {note}
        </Typography>
      </CardContent>
    </Card>
  );
}
