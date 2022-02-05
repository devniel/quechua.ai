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
  Pagination,
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
  searchRecord,
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
import RecordCard from '../../components/RecordCard';
import { Search } from '@quechua.ai/entities';

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

export function SearchResults() {
  const router = useRouter();
  const search = useSelector((state: any) => state.search);
  const [query, setQuery] = useState<string>(search?.query || '');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!router.isReady) return;
    setQuery(router.query.query || '');
    dispatch(searchRecord({ query: router.query.query }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  /** When changing query text */
  const handleChangeQuery = (e) => {
    setQuery(e?.target?.value || '');
  };

  /** Handle search */
  const handleSearch = () => {
    dispatch(searchRecord({ query }));
  };

  /** Handle change page */
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(
      searchRecord({
        query: search.query,
        page: value,
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
          flexDirection: 'row',
          mb: 1,
        }}
      >
        <TextField
          fullWidth
          label="search for a quechua word"
          id="fullWidth"
          value={query}
          onChange={handleChangeQuery}
        />
        <Button variant="contained" sx={{ ml: 1 }} onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {/* Results */}
        {search?.results?.map((record) => (
          <RecordCard key={record.id} {...record} />
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          mt: 2,
        }}
      >
        <Pagination
          count={Math.ceil(search?.total / search?.pageSize)}
          page={search?.page}
          onChange={handleChangePage}
        />
      </Box>
    </Container>
  );
}

export default SearchResults;
