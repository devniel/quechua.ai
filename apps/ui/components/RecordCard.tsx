import { PropsWithChildren } from 'react';
import { css, jsx } from '@emotion/react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { Record } from '@quechua.ai/entities';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TagsInput from './TagsInput';
import Chip from '@mui/material/Chip';

export default function RecordCard({
  id,
  text,
  note,
  tags = [],
}: PropsWithChildren<Record>) {
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
          <Typography variant="h5" component="div" flex={1}>
            {text}
          </Typography>
        </Box>
        {tags.map((tag) => (
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
