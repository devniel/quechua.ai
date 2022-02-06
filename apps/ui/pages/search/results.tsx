import * as api from '../../services/api';
import * as d3 from 'd3';
import * as d3Annotation from 'd3-svg-annotation';

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
  TextField,
  TextareaAutosize,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  addAnnotation,
  createRecord,
  deleteAnnotation,
  editAnnotation,
  editRecord,
  getRecord,
  searchRecord,
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Annotation from '../../components/Annotation';
import AnnotationCard from '../../components/AnnotationCard';
import AnnotationModal from '../../components/AnnotationModal';
import { DEFAULT_PAGE_SEARCH_RESULTS } from '../../constants/constants';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GithubPicker } from 'react-color';
import NavigationIcon from '@mui/icons-material/Navigation';
import RecordCard from '../../components/RecordCard';
import RecordModal from '../../components/RecordModal';
import RecordText from '../../components/RecordText';
import { Search } from '@quechua.ai/entities';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TagsInput from '../../components/TagsInput';
import { push } from 'connected-next-router';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Empty from '../../components/images/Empty';
import CreateIcon from '@mui/icons-material/Create';

export async function getServerSideProps(context) {
  const search = await api.searchRecord(context.query);
  return {
    props: search,
  };
}

export function SearchResults({ query, results, page, pageSize, total }) {
  const queryField = useRef<HTMLInputElement>();
  const dispatch = useDispatch();

  /** Handle search */
  const handleSearch = () => {
    dispatch(
      push({
        pathname: DEFAULT_PAGE_SEARCH_RESULTS,
        query: {
          query: queryField.current?.value,
          page: 1,
        },
      })
    );
  };

  /** Handle change page */
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(
      push({
        pathname: DEFAULT_PAGE_SEARCH_RESULTS,
        query: { query, page: value },
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
          inputRef={queryField}
          fullWidth
          label="search for a quechua word"
          id="fullWidth"
          defaultValue={query}
        />
        <Button variant="contained" sx={{ ml: 1 }} onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {/** Empty page */}
      {results.length == 0 && (
        <Box
          display={'flex'}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          m={10}
        >
          <Empty width={200} height={200} />
          <Typography variant="h5" component="div" mt={5} textAlign={'center'}>
            {`No results were found for `}
            <strong>&quot;{query}&quot;</strong>, do you want to contribute it ?
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            href={`/records/new?text=${query}`}
            startIcon={<CreateIcon />}
          >
            Add record
          </Button>
        </Box>
      )}
      {/** Content page */}
      {results.length > 0 && (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {/* Results */}
            {results.length > 0 &&
              results?.map((record) => (
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
              count={Math.ceil(total / pageSize)}
              page={Number(page as string)}
              onChange={handleChangePage}
            />
          </Box>
        </>
      )}
    </Container>
  );
}

export default SearchResults;
